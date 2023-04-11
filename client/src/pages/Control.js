import React, { useState, useEffect } from 'react';
import { Card, Box, CardContent, Typography, CardMedia, } from '@mui/material';
import RangeSlider from '../components/RangeSlider';
import IOSSwitch from '../components/IOSSwitch';
import Cookie from 'universal-cookie';
import axios from 'axios'
import { socket } from '../socket';

const cookie = new Cookie()

const handleSwitch = (checked, type) => {
    const value = checked ? 1 : 0;

    publishValue(value, type)
}

const publishValue = (value, type) => {
    axios.post(`http://localhost:8080/adafruit/publish/${type}/${value}`, {
        user_id: cookie.get('user_id'),
    })
}


const ControlCard = ({ image, title }) => (
    <Card sx={{ borderRadius: "12px" }} className='mx-6 w-44 h-64 mb-5 flex flex-col p-3 justify-start items-center'>
        <CardMedia
            component="img"
            sx={{ width: 64, margin: "0.5rem 1.5rem" }}
            image={image}
            alt="Live from space album cover"
        />
        <Box>
            <CardContent sx={{ flex: '1 0 auto', justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: 600 }} variant="subtitle1" color="text.secondary" component="div">
                    {title}
                </Typography>
                <div>
                    <IOSSwitch onChange={e => handleSwitch(e.target.checked, 'yolo-pump')} className=" mt-5" />
                </div>
            </CardContent>
        </Box>
    </Card>
)

const Control = () => {
    const [timeStart, setTimeStart] = useState('05:00')
    const [timeEnd, setTimeEnd] = useState('20:00')
    const [pHMin, setPHMin] = useState('20%')
    const [pHMax, setPHMax] = useState('80%')
    const [pump, setPump] = useState(0)

    useEffect(() => {
        socket.connect()

        socket.emit('getData', { user_id: cookie.get('user_id') })

        const handleDataRecv = (data) => {
            if (data.type === 'yolo-time-start') {
                setTimeStart(data.value);
            } else if (data.type === 'yolo-time-end') {
                setTimeEnd(data.value);
            } else if (data.type === 'yolo-ph-min') {
                setPHMin(data.value + '%');
            } else if (data.type === 'yolo-ph-max') {
                setPHMax(data.value + '%');
            } else if (data.type === 'yolo-ph-max') {
                setPump(data.value);
            }
        }

        socket.on('data_recv', handleDataRecv)

        return () => {
            socket.off('data_recv', handleDataRecv);
        }
    }, [])

    function TimestampToTime(value) {
        const hour = Math.floor(value / 60)
        const minute = value - hour * 60

        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
    }

    function TimeToTimestamp(value) {
        const split = value.split(':');
        return parseInt(split[0]) * 60 + parseInt(split[1])
    }


    function handleOnChange(event, value, activeThumb, type) {
        if (type === 'yolo-time') {
            if (activeThumb === 0)
                setTimeStart(TimestampToTime(Math.min(value[0], value[1] - 100)))
            else
                setTimeEnd(TimestampToTime(Math.max(value[1], value[0] + 100)))
        } else if (type === 'yolo-ph') {
            if (activeThumb === 0)
                setPHMin(`${Math.min(value[0], value[1] - 10)}%`)
            else
                setPHMax(`${Math.max(value[1], value[0] + 10)}%`)
        }
    }

    function SaveAutoData() {
        publishValue(timeStart, 'yolo-time-start')
        publishValue(timeEnd, 'yolo-time-end')
        publishValue(pHMax.slice(0, -1), 'yolo-ph-max')
        publishValue(pHMin.slice(0, -1), 'yolo-ph-min')
    }

    return (
        <div className='body m-10'>
            <div className='flex justify-around'>
                <div className='flex flex-col'>
                    <h1 className='text-black font-semibold mb-6'>Thủ công</h1>
                    <div className='flex'>
                        <ControlCard image='./img/water.png' title="Máy bơm" />
                    </div>
                </div>
                <div className='flex flex-col bg-white p-6 shadow-md rounded-xl'>
                    <div className='flex items-center mb-6 justify-between'>
                        <h1 className='text-black font-semibold'>Tự động</h1>
                        <IOSSwitch className='ml-5' onChange={e => handleSwitch(e.target.checked, 'yolo-auto')} />
                    </div>
                    <div style={{ width: 600 }} className="flex flex-col my-6">
                        <div className='font-semibold  mb-3'>Lịch trình</div>
                        <div className='flex items-center'>
                            <div>{timeStart}</div>
                            <RangeSlider minDistance={100} step={10} value={[TimeToTimestamp(timeStart), TimeToTimestamp(timeEnd)]} defaultValue={[TimeToTimestamp(timeStart), TimeToTimestamp(timeEnd)]} max={1439} onChange={(event, value, activeThumb) => { handleOnChange(event, value, activeThumb, 'yolo-time') }} />
                            <div>{timeEnd}</div>
                        </div>
                    </div>
                    <div className="flex flex-col my-6">
                        <div className='font-semibold mb-3'>Độ ẩm</div>
                        <div className='flex items-center'>
                            <div>{pHMin}</div>
                            <RangeSlider minDistance={10} step={1} value={[pHMin.slice(0, -1), pHMax.slice(0, -1)]} defaultValue={[pHMin.slice(0, -1), pHMax.slice(0, -1)]} max={100} onChange={(event, value, activeThumb) => { handleOnChange(event, value, activeThumb, 'yolo-ph') }} />
                            <div>{pHMax}</div>
                        </div>
                    </div>
                    <button onClick={() => SaveAutoData()} className='bg-green-500 w-24 py-2 rounded-md text-white self-end font-medium mt-5'>Lưu</button>
                </div>

            </div>
        </div>
    )
}

export default Control