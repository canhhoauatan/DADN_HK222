import React from 'react';
import { Card, Box, CardContent, Typography, CardMedia, } from '@mui/material';
import RangeSlider from '../components/RangeSlider';
import IOSSwitch from '../components/IOSSwitch';
import Cookie from 'universal-cookie';
import axios from 'axios'

const cookie = new Cookie()

const handleSwitch = (checked, type) => {
    const value = checked ? 1 : 0;

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
    return (
        <div className='body m-10'>
            <div className='flex items-center mb-6 mt-6'>
                <h1 className='text-black font-semibold'>Tự động</h1>
                <IOSSwitch className='ml-5' onChange={e => handleSwitch(e.target.checked, 'yolo-auto')} />
            </div>
            <Box sx={{ width: '300px' }}>
                <RangeSlider />
            </Box>
            <h1 className='text-black font-semibold mb-6 mt-6'>Thủ công</h1>
            <ControlCard image='./img/water.png' title="Máy bơm" />
        </div>
    )
}

export default Control