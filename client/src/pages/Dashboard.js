import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import Cookie from 'universal-cookie';
import LineChart from '../components/LineChart';
import SensorCard from '../components/SensorCard';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import WebcamCapture from '../components/WebcamCapture';


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

    const [lightValue, setLightValue] = useState('');
    const [tempValue, setTempValue] = useState('');
    const [pHValue, setPHValue] = useState('');
    const [lightData, setLightData] = useState(JSON.parse(JSON.stringify({ ...initLightData })));
    const [tempData, setTempData] = useState(JSON.parse(JSON.stringify({ ...initTempData })));
    const [pHData, setPHData] = useState(JSON.parse(JSON.stringify({ ...initPHData })));
    const [chartActive, setChartActive] = useState('light')
    const [logData, setLogData] = useState([]);
    // const [imgSrc, setImgSrc] = useState('');
    // const webcamRef = useRef(null);

    const columns = [{ name: 'Thời gian', selector: row => row.time, sortable: true }, { name: 'Hoạt động', selector: row => row.activity }]



    // const captureAndSend = () => {
    //     const imageSrc = webcamRef.current.getScreenshot()
    //     setImgSrc(imageSrc)
    //     socket.emit('webcam-data', { image: imageSrc })
    // };

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
            } else if (data.type === 'yolo-ph') {
                initPHData.labels = data.records.map(record => new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                initPHData.datasets[0].data = data.records.map(record => record.data)
                setPHData(JSON.parse(JSON.stringify({ ...initPHData })))
            }
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

        const handleLogRecv = (data) => {
            const logs = data.logs.map(item => ({
                time: new Date(item.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) + " " +
                    new Date(item.created_at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                activity: item.activity
            }))
            setLogData(logs.slice(0, 6))
        }

        socket.emit('getRecord', { user_id: cookie.get('user_id') })
        socket.emit('getData', { user_id: cookie.get('user_id') })
        socket.emit('getLog', { user_id: cookie.get('user_id') })
        socket.on('record_recv', handleRecordRecv)
        socket.on('data_recv', handleDataRecv)
        socket.on('log_recv', handleLogRecv)

        socket.on('askForUserId', () => {
            socket.emit('userIdReceived', { user_id: cookie.get('user_id') })
        })

        return () => {
            socket.off('askForUserId');
            socket.off('record_recv', handleRecordRecv);
            socket.off('data_recv', handleDataRecv);
            socket.off('log_recv', handleLogRecv);
        }
    }, [])


    return (
        <div className='body' style={{ color: 'white' }}>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1'>
                <SensorCard image='./img/sun.png' value={lightValue} unit="%" title="Độ sáng" />
                <SensorCard image='./img/temp.png' value={tempValue} unit="°C" title="Nhiệt độ" />
                <SensorCard image='./img/ph.png' value={pHValue} unit="pH" title="Độ ẩm đất" />
                <WebcamCapture />
            </div>
            <div className='flex items-start'>
                <div className='flex flex-col flex-1'>
                    <div className='w-11/12 bg-white p-3 shadow-md rounded-lg m-auto' >
                        <div className='text-black font-semibold m-3'>
                            <Link to='/data' >Thống kê</Link>
                        </div>

                        {/* <div className='text-black font-semibold m-3'>Thống kê</div> */}
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
                </div>
                <div className='flex-1'>
                    <div className='w-11/12 bg-white p-3 shadow-md rounded-lg m-auto' >
                        <div className='text-black font-semibold m-3'>
                            <Link to='/activity' >Hoạt động gần đây</Link>
                        </div>
                        <DataTable columns={columns} data={logData} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard