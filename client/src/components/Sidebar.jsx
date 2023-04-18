import { Link, NavLink } from 'react-router-dom';

import WindowIcon from '@mui/icons-material/Window';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';

import { useStateContext } from '../contexts/ContextProvider';

const activeLink = 'flex shadow-md items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-3 bg-green-500';
const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-3';

const MenuItem = ({ to, icon, title, activeMenu }) => (
    <div>
        <NavLink to={to} className={({ isActive }) => isActive ? activeLink : normalLink}>
            {icon}
            {activeMenu ? title : ''}
        </NavLink>
    </div>
)

const Sidebar = () => {
    const { activeMenu, setActiveMenu } = useStateContext()


    let sidebarClass = 'fixed bg-white shadow-xl transition-all ease-in-out h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto '

    if (activeMenu) {
        sidebarClass += 'w-60'
    }
    else sidebarClass += 'w-20'

    return (
        <div>
            <div className={sidebarClass}>
                <div className='mt-2 flex justify-center items-center'>
                    {activeMenu ?
                        <Link to="/" onClick={() => { setActiveMenu(false) }} className='items-center mt-4 flex text-3xl font-extrabold
                    tracking-tight dark:text-white text-slate-900'>
                            <span className='text-green-500'>La</span><span className=''>tuce</span><span className='text-green-500'>.</span>
                        </Link>
                        :
                        <DehazeIcon onClick={() => { setActiveMenu(true) }} className='mt-7 cursor-pointer' />
                    }
                </div>
                <div className='mt-10'>
                    <MenuItem to="/" icon={<WindowIcon />} title="Tổng quan" activeMenu={activeMenu} />
                    <MenuItem to="/control" icon={<ControlCameraIcon />} title="Điều khiển" activeMenu={activeMenu} />
                    <MenuItem to="/data" icon={<BarChartIcon />} title="Dữ liệu" activeMenu={activeMenu} />
                    <MenuItem to="/activity" icon={<HistoryIcon />} title="Hoạt động" activeMenu={activeMenu} />
                </div>
            </div >
            <div className={activeMenu ? 'w-60' : 'w-20'}></div>
        </div>

    )
}

export default Sidebar