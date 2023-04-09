import React, { useState } from 'react';
import { Card, Box, CardContent, Typography, CardMedia, } from '@mui/material';
import RangeSlider from '../components/RangeSlider';
import IOSSwitch from '../components/IOSSwitch';
import Cookie from 'universal-cookie';
import axios from 'axios'

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

    function formatTime(value) {
        const hour = Math.floor(value / 60)
        const minute = value - hour * 60

        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
    }


    function handleOnChange(event, value, activeThumb, type) {
        if (type === 'yolo-time') {
            if (activeThumb === 0)
                setTimeStart(formatTime(Math.min(value[0], value[1] - 100)))
            else
                setTimeEnd(formatTime(Math.max(value[1], value[0] + 100)))
        } else if (type === 'yolo-ph') {
            if (activeThumb === 0)
                setPHMin(`${Math.min(value[0], value[1] - 10)}%`)
            else
                setPHMax(`${Math.max(value[1], value[0] + 10)}%`)
        }
    }

    function handleOnChangeCommitted(event, value, type) {
        if (type === 'yolo-time') {
            publishValue(timeStart, 'yolo-time-start')
            publishValue(timeEnd, 'yolo-time-end')
        } else if (type === 'yolo-ph') {
            publishValue(pHMax.slice(0, -1), 'yolo-ph-max')
            publishValue(pHMin.slice(0, -1), 'yolo-ph-min')
        }
    }

    return (
        <div className='body m-10'>
            <div className='flex items-center mb-6 mt-6'>
                <h1 className='text-black font-semibold'>Tự động</h1>
                <IOSSwitch className='ml-5' onChange={e => handleSwitch(e.target.checked, 'yolo-auto')} />
            </div>
            <Box sx={{ width: '600px' }} className="my-2 flex items-center">
                <div>{timeStart}</div>
                <RangeSlider minDistance={100} step={10} defaultValue={[300, 1200]} max={1439} onChange={(event, value, activeThumb) => { handleOnChange(event, value, activeThumb, 'yolo-time') }} onChangeCommitted={(event, value) => { handleOnChangeCommitted(event, value, 'yolo-time') }} />
                <div>{timeEnd}</div>
            </Box>
            <Box sx={{ width: '600px' }} className="my-2 flex items-center">
                <div>{pHMin}</div>
                <RangeSlider minDistance={10} step={1} defaultValue={[20, 80]} max={100} onChange={(event, value, activeThumb) => { handleOnChange(event, value, activeThumb, 'yolo-ph') }} onChangeCommitted={(event, value) => { handleOnChangeCommitted(event, value, 'yolo-ph') }} />
                <div>{pHMax}</div>
            </Box>
            <h1 className='text-black font-semibold mb-6 mt-6'>Thủ công</h1>
            <ControlCard image='./img/water.png' title="Máy bơm" />
        </div>
    )
}

export default Control