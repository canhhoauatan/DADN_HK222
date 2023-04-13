import express from 'express'
const app = express()

const app_port = process.env.PORT || 8080
const server_port = process.env.PORT || 5000
const mongo_uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/latuce'

import mongoose from 'mongoose'
import authRouter from './routes/auth.routes.js'
import adafruitRouter from './routes/adafruit.routes.js'
import socketMap from './socket.js'

import cors from 'cors'

import { createServer } from "http";
import { Server } from "socket.io";

import Record from './models/Record.js'
import Sensor from './models/Sensor.js'
import User from './models/User.js'
import Log from './models/Log.js'

import MQTTAdafruitIO from './adafruit.js'
import * as tf from '@tensorflow/tfjs-node'
import { promises as fs } from 'fs';

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const modelPath = tf.io.fileSystem("./build/model.json")
const classifyJSONPath = './build/class_indices.json'
const classifyIndices = JSON.parse(await fs.readFile(classifyJSONPath, 'utf8'))
const model = await tf.loadLayersModel(modelPath)

ConnectDatabase()
ConnectAdafruit()

async function ConnectDatabase() {
    try {
        await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB Connected!')
    } catch (err) {
        console.log(err)
    }
}

async function ConnectAdafruit() {
    const users = await User.find({})

    for (let i = 0; i < users.length; i++) {
        const mqttClient = new MQTTAdafruitIO(users[i].id, users[i].username, users[i].key, io)
        mqttClient.connect()

        const sensors = await Sensor.find({ user_id: users[i].id })

        for (let j = 0; j < sensors.length; j++) {
            console.log(sensors[j].type)
            mqttClient.subscribe(sensors[j].type)
        }
    }
}


app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/auth', authRouter)
app.use('/adafruit', adafruitRouter)



app.listen(app_port, () => console.log('App listening on ' + app_port))
httpServer.listen(server_port, () => console.log('Server listening on ' + server_port))

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)

    io.to(socket.id).emit('askForUserId')

    socket.on('userIdReceived', async (data) => {
        const user_id = data.user_id
        socketMap[user_id] = socket.id;
    });

    socket.on('getRecord', async (data) => {
        const user_id = data.user_id
        const sensors = await Sensor.find({ user_id: user_id })

        for (let i = 0; i < sensors.length; i++) {
            const records = await Record.find({ sensor_id: sensors[i].id })
            if (socket.id != null) {
                io.to(socket.id).emit("record_recv", { type: sensors[i].type, records: records })
            }
        }
    });

    socket.on('getData', async (data) => {
        const user_id = data.user_id
        const sensors = await Sensor.find({ user_id: user_id })

        for (let i = 0; i < sensors.length; i++) {
            const records = await Record.find({ sensor_id: sensors[i].id })
            if (socket.id != null) {
                io.to(socket.id).emit("data_recv", { type: sensors[i].type, value: sensors[i].value })
            }
        }
    });

    socket.on('getLog', async (data) => {
        const user_id = data.user_id
        const logs = await Log.find({ user_id: user_id })

        if (socket.id != null) {
            io.to(socket.id).emit("log_recv", { logs: logs.reverse() })
        }
    })

    socket.on('webcam-data', async (data) => {

        const base64 = data.image.split(',')[1]
        const b = Buffer.from(base64, 'base64')
        const t = tf.image.resizeNearestNeighbor(tf.node.decodeImage(b), [224, 224])


        // // Convert PNG image data to base64 string
        // const pngData = await tf.node.encodeJpeg(t);


        // const buffer = Buffer.from(pngData);
        // const base64data = buffer.toString('base64');

        // console.log(base64data);

        //console.log(model.summary())
        //console.log(t.expandDims(0))

        let predictions = await model.predict(t.expandDims(0)).data();
        let maxValue = predictions[0]; // Assume the first element is the maximum value
        let maxIndex = 0; // Assume the index of the maximum value is 0
        for (let i = 0; i < predictions.length; i++) {
            if (predictions[i] > maxValue) {
                maxValue = predictions[i];
                maxIndex = i;
            }
        }
        console.log(classifyIndices[maxIndex])
        console.log(maxValue)
    })
});

