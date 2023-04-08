import React from 'react'

import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {


    return (<>
        <Sidebar />
        <div className='flex-1 bg-light-gray'>
            <Navbar />
            <div className='mt-10'>
                <Outlet />
            </div>
        </div>
    </>)
}

export default DashboardLayout