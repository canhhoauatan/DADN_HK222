import React, { useState, useEffect } from 'react';
import { Card, Box, CardContent, Typography, CardMedia, Modal } from '@mui/material';
import RangeSlider from '../components/RangeSlider';
import IOSSwitch from '../components/IOSSwitch';
import Cookie from 'universal-cookie';
import axios from 'axios'
import { socket } from '../socket';


const cookie = new Cookie()

const Control = () => {
    const [timeStart, setTimeStart] = useState('05:00')
    const [timeEnd, setTimeEnd] = useState('20:00')
    const [pHMin, setPHMin] = useState('20%')
    const [pHMax, setPHMax] = useState('80%')
    const [pump, setPump] = useState(false)
    const [auto, setAuto] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const ControlCard = ({ image, title, value }) => (
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
                        <IOSSwitch onChange={e => handleSwitch(e.target.checked, 'yolo-pump')} className=" mt-5" checked={value} />
                    </div>
                </CardContent>
            </Box>
        </Card>
    )



    const handleSwitch = (checked, type) => {
        if (type === 'yolo-pump' && auto === true) {
            setModalOpen(true)
        } else {
            publishValue(checked ? 1 : 0, type)
        }
    }

    const publishValue = (value, type) => {
        axios.post(`http://localhost:8080/adafruit/publish/${type}/${value}`, {
            user_id: cookie.get('user_id'),
        })
    }

    const handleDataRecv = (data) => {
        if (data.type === 'yolo-time-start') {
            setTimeStart(data.value);
        } else if (data.type === 'yolo-time-end') {
            setTimeEnd(data.value);
        } else if (data.type === 'yolo-ph-min') {
            setPHMin(data.value + '%');
        } else if (data.type === 'yolo-ph-max') {
            setPHMax(data.value + '%');
        } else if (data.type === 'yolo-pump') {
            setPump(data.value === '1' ? true : false)
        } else if (data.type === 'yolo-auto') {
            setAuto(data.value === '1' ? true : false)
        }
    }

    useEffect(() => {
        if (socket.connected) {
            socket.connect()
        }

        socket.emit('getData', { user_id: cookie.get('user_id') })



        socket.on('data_recv', handleDataRecv)

        socket.on('askForUserId', () => {
            socket.emit('userIdReceived', { user_id: cookie.get('user_id') })
        })

        return () => {
            socket.off('askForUserId');
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
        socket.emit('createLog', { user_id: cookie.get('user_id'), activity: 'Cập nhật lịch trình tự động' })
    }

    function handleOnCloseModal() {
        setModalOpen(false)
    }


    return (
        <div className='body m-10'>
            <Modal sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: 3
            }} open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className='w-full h-full bg-white p-6 rounded-md shadow-lg'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cảnh báo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        Máy bơm đang ở chế độ tự động. Bạn có muốn tắt nó?
                    </Typography>
                    <button onClick={() => { handleSwitch(false, 'yolo-auto'); publishValue(!pump ? 1 : 0, 'yolo-pump'); handleOnCloseModal() }} className='text-white bg-green-500 px-6 py-2 rounded-md font-semibold'>Có</button>
                </div>
            </Modal>
            <div className='flex justify-around'>
                <div className='flex flex-col'>
                    <h1 className='text-black font-semibold mb-6'>Thủ công</h1>
                    <div className='flex'>
                        <ControlCard image='./img/water.png' title="Máy bơm" value={pump} />
                    </div>
                </div>
                <div className='flex flex-col bg-white p-6 shadow-md rounded-xl'>
                    <div className='flex items-center mb-6 justify-between'>
                        <h1 className='text-black font-semibold'>Tự động</h1>
                        <IOSSwitch className='ml-5' onChange={e => handleSwitch(e.target.checked, 'yolo-auto')} checked={auto} />
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
                            <RangeSlider minDistance={10} step={1} value={[pHMin.slice(0, -1), pHMax.slice(0, -1)]} max={100} defaultValue={[TimeToTimestamp(timeStart), TimeToTimestamp(timeEnd)]} onChange={(event, value, activeThumb) => { handleOnChange(event, value, activeThumb, 'yolo-ph') }} />
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