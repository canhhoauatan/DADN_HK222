import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from './layouts/DashboardLayout';
import LoginLayout from './layouts/LoginLayout';

import Dashboard from './pages/Dashboard'
import Control from './pages/Control'
import Login from './pages/Login'
import Activity from './pages/Activity';
import Data from './pages/Data';

import Cookie from 'universal-cookie';

import './App.css'

const cookie = new Cookie()
const authToken = cookie.get('token')


const App = () => {

    return (authToken ?
        <div id="app" className='flex'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardLayout />} >
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="control" element={<Control />} />
                        <Route path="data" element={<Data />} />
                        <Route path="activity" element={<Activity />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter >
        </div >
        :
        <div id="app" className='flex h-screen'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginLayout />} >
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter >
        </div >
    )
}

export default App