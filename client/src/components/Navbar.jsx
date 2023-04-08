import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

import Cookie from 'universal-cookie'


import DehazeIcon from '@mui/icons-material/Dehaze';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const cookie = new Cookie()

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <Tooltip title={title} placement='bottom'>
        <button type="button" onClick={customFunc} style={{ color }} className='relative p-3 text-xl rounded-full hover:bg-light-gray'>
            <span style={{ backgroundColor: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 top-4 right-3.5'>

            </span>
            {icon}
        </button>
    </Tooltip>
)

function Navbar() {
    const { activeMenu, setActiveMenu } = useStateContext()
    const [activeTooltip, setActiveTooltip] = useState('')

    const handleLogout = () => {
        cookie.remove('token')
        window.location.reload()
    }


    return (
        <div className='mt-3 flex justify-between p-2 md:mx-6 bg-white rounded-2xl shadow-md'>
            <NavButton title="Menu" customFunc={() => setActiveMenu(!activeMenu)} color="rgb(34 197 94)" icon={<DehazeIcon />} />

            <div className='flex items-center'>
                <NavButton title="Notifications" color="rgb(156 163 175)" dotColor="rgb(34 197 94)" icon={<NotificationsIcon onClick={() => setActiveTooltip(activeTooltip == 'notification' ? '' : 'notification')} />} />
                <Tooltip title="Profile">
                    <div onClick={() => setActiveTooltip(activeTooltip == 'profile' ? '' : 'profile')} className='flex items-center gap-2 cursor-pointer p-1'>
                        <p>
                            <span className='text-gray-400 text-14'>Hi, </span>{' '}
                            <span className='text-gray-400 font-bold ml-1 text-14'>Tuan</span>
                        </p>
                        <ArrowDropDownIcon className='text-gray-400 text-14' />
                    </div>
                </Tooltip>
                {activeTooltip === 'profile' ?
                    <div onClick={() => handleLogout()} className='absolute top-24 right-6 bg-white hover:bg-light-gray rounded-lg shadow-xl p-3'>
                        <div className='flex w-40 cursor-pointer'>
                            <LogoutIcon className='text-gray-400 text-14 mx-3' />
                            <p>Đăng xuất</p>
                        </div>
                    </div> : null
                }
                {activeTooltip === 'notification' ?
                    <div></div> : null
                }
            </div>


        </div>
    )
}

export default Navbar