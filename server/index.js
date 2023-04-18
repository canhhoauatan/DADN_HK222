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

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})


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

    socket.on('createLog', async (data) => {
        const user_id = data.user_id
        const activity = data.activity
        const newLog = new Log({ user_id: user_id, activity: activity })
        newLog.save()
    })
});

