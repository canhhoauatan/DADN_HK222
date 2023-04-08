import React from 'react'

import { Outlet } from 'react-router-dom'

const LoginLayout = () => {
    return (<>
        <div className='flex w-full'>
            <div className='bg-red-300 flex-1 max-md:hidden max-lg:-ml-32'>
                <img alt="Latuce" className='object-none h-full w-full' src='./img/latuce_bg.jpg' />
            </div>
            <div className='flex-1 h-screen'>
                <div className='m-12 max-md:mt-10 max-md:mx-5 '>
                    <div className='mb-12'>
                        <div className='text-4xl font-extrabold'>
                            <span className='text-green-500'>La</span><span className=''>tuce</span><span className='text-green-500'>.</span>
                        </div>
                        <h2>Hệ thống tưới nhỏ giọt cho cây xà lách</h2>
                    </div>
                    <Outlet />
                </div>

            </div>
        </div >

    </>)
}

export default LoginLayout;