import React from 'react';
import { Card, Box, CardContent, Typography, CardMedia } from '@mui/material';

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

export default SensorCard;