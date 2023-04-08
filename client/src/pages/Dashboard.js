import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, CardContent, Typography, CardMedia } from '@mui/material';
import { socket } from '../socket';
import Cookie from 'universal-cookie';
import LineChart from '../components/LineChart';
import { light } from '@mui/material/styles/createPalette';

const SensorCard = ({ image, value, unit, title }) => (
    <Card sx={{ borderRadius: "12px" }} className='mx-6 mb-5 flex p-3 justify-start items-center'>
        <CardMedia
            component="img"
            sx={{ width: 55, height: 55, margin: "0rem 1.5rem" }}
            image={image}
            alt="Live from space album cover"
        />
        <Box className='flex justify-center'>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <h4 className='text-2xl font-bold'>
                    {value}{unit}
                </h4>
                <Typography sx={{ fontWeight: 500, marginRight: "1rem" }} variant="subtitle1" color="text.secondary" component="div">
                    {title}
                </Typography>
            </CardContent>
        </Box>
    </Card>
)

const cookie = new Cookie()

const Dashboard = () => {
    const initLightData = {
        labels: ['20', '12'],
        datasets: [{
            label: 'Độ sáng',
            data: [5, 6],
            borderColor: "#ffd700",
            fill: false,
            tension: 0.3
        }]
    }
    const initTempData = {
        labels: ['20', '12'],
        datasets: [{
            label: 'Nhiệt độ',
            data: [30, 33],
            borderColor: "#e74646",
            fill: false,
            tension: 0.3
        }]
    }

    const [lightValue, setLightValue] = useState('');
    const [tempValue, setTempValue] = useState('');
    const [pHValue, setPHValue] = useState('');
    const [lightData, setLightData] = useState(JSON.parse(JSON.stringify({ ...initLightData })));
    const [tempData, setTempData] = useState(JSON.parse(JSON.stringify({ ...initTempData })));
    const [pHData, setPHData] = useState();


    useEffect(() => {
        socket.connect()

        const handleRecordRecv = (data) => {
            if (data.type === 'yolo-light') {
                initLightData.labels = data.records.map(record => new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                initLightData.datasets[0].data = data.records.map(record => record.data)
                setLightData(JSON.parse(JSON.stringify({ ...initLightData })))
            } else if (data.type === 'yolo-temp') {
                initTempData.labels = data.records.map(record => new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                initTempData.datasets[0].data = data.records.map(record => record.data)
                setTempData(JSON.parse(JSON.stringify({ ...initTempData })))
            }
            // else if (data.type === 'yolo-ph') {
            //     setPHValue(data.last_value)
            // }
        }

        const handleDataRecv = (data) => {
            if (data.type === 'yolo-light') {
                setLightValue(data.value);
            } else if (data.type === 'yolo-temp') {
                setTempValue(data.value);
            } else if (data.type === 'yolo-ph') {
                setPHValue(data.value);
            }
        }
        socket.emit('getRecordAndData', { user_id: cookie.get('user_id') })

        socket.on('askForUserId', () => {
            socket.emit('userIdReceived', { user_id: cookie.get('user_id') })
        })

        socket.on('record_recv', handleRecordRecv)

        socket.on('data_recv', handleDataRecv)

        return () => {
            socket.off('askForUserId');
            socket.off('record_recv', handleRecordRecv);
            socket.off('data_recv', handleDataRecv);
        }
    }, [])


    return (
        <div className='body' style={{ color: 'white' }}>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                <SensorCard image='./img/sun.png' value={lightValue} unit="%" title="Độ sáng" />
                <SensorCard image='./img/temp.png' value={tempValue} unit="°C" title="Nhiệt độ" />
                <SensorCard image='./img/ph.png' value={pHValue} unit="pH" title="Độ ẩm đất" />
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1'>
                <div className='w-3/4 bg-white p-3 shadow-xl rounded-lg m-auto' >
                    <LineChart data={lightData} />
                </div>
                <div className='w-3/4 bg-white p-3 shadow-xl rounded-lg m-auto' >
                    <LineChart data={tempData} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard