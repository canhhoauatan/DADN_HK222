import React, { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import { socket } from '../socket';
import Cookie from 'universal-cookie';

const cookie = new Cookie()

const Data = () => {
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

    const initPHData = {
        labels: ['20', '12'],
        datasets: [{
            label: 'Độ ẩm',
            data: [30, 33],
            borderColor: "#576CBC",
            fill: false,
            tension: 0.3
        }]
    }

    const [lightData, setLightData] = useState(JSON.parse(JSON.stringify({ ...initLightData })));
    const [tempData, setTempData] = useState(JSON.parse(JSON.stringify({ ...initTempData })));
    const [pHData, setPHData] = useState(JSON.parse(JSON.stringify({ ...initPHData })));
    const [chartActive, setChartActive] = useState('light')

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }
        const handleRecordRecv = (data) => {
            if (data.type === 'yolo-light') {
                initLightData.labels = data.records.map(record => new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                initLightData.datasets[0].data = data.records.map(record => record.data)
                setLightData(JSON.parse(JSON.stringify({ ...initLightData })))
            } else if (data.type === 'yolo-temp') {
                initTempData.labels = data.records.map(record => new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                initTempData.datasets[0].data = data.records.map(record => record.data)
                setTempData(JSON.parse(JSON.stringify({ ...initTempData })))
            } else if (data.type === 'yolo-ph') {
                initPHData.labels = data.records.map(record => new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                initPHData.datasets[0].data = data.records.map(record => record.data)
                setPHData(JSON.parse(JSON.stringify({ ...initPHData })))
            }
        }

        socket.emit('getRecord', { user_id: cookie.get('user_id') })
        socket.on('record_recv', handleRecordRecv)

        return () => {
            socket.off('askForUserId');
            socket.off('record_recv', handleRecordRecv);
        }
    }, [])

    return (

        < div className='text-black' >
            <div className='w-10/12 bg-white p-3 shadow-md rounded-lg m-auto' >
                <LineChart height={140} data={
                    chartActive === 'light' ? lightData :
                        chartActive === 'temp' ? tempData :
                            chartActive === 'ph' ? pHData : null
                } />
                <div className='flex justify-around'>
                    <button onClick={() => setChartActive('light')} className={chartActive === 'light' ? 'bg-yellow-400 text-white py-2 px-3 rounded-md font-medium' : 'hover:bg-yellow-100 text-yellow-400 py-2 px-3 rounded-md font-medium'}>Độ sáng</button>
                    <button onClick={() => setChartActive('temp')} className={chartActive === 'temp' ? 'bg-red-500 text-white py-2 px-3 rounded-md font-medium' : 'hover:bg-red-100 text-red-500 py-2 px-3 font-medium rounded-md'}> Nhiệt độ</button>
                    <button onClick={() => setChartActive('ph')} className={chartActive === 'ph' ? 'bg-purple-500 text-white py-2 px-3 rounded-md font-medium' : 'hover:bg-purple-100 text-purple-500 py-2 px-3 rounded-md font-medium'}>Độ ẩm</button>
                </div>
            </div>

        </div >
    )
}

export default Data