import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import './SideNavbar.css';
import { IconContext } from 'react-icons';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
import { RiLockPasswordFill } from "react-icons/ri"
import { FiActivity } from "react-icons/fi"
import { TbReport } from "react-icons/tb"

function SideNavbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div value={{ color: '#fff' }}>
                <div className='navbar'>
                    <h2>Treegram</h2>
                    <NavLink to='#' className='menu-bars'>
                        <RxHamburgerMenu onClick={showSidebar} />
                    </NavLink>

                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        {/* <li className='navbar-toggle'>
                            <NavLink to='#' className='menu-bars-close'>
                                <RxCross1 />
                            </NavLink>
                        </li> */}
                        <li><NavLink to="/setting/change-password"><RiLockPasswordFill />Change Password</NavLink></li>
                        <li><NavLink to="/setting/your-activity"><FiActivity />Your Activity</NavLink></li>
                        <li><NavLink to="/setting/login-activity"><FiActivity />Login Activity</NavLink></li>
                        <li><NavLink to="/setting/report-problem"><TbReport />Report Problem</NavLink></li>
                        <li><NavLink to="/setting/statistics">Statistics</NavLink></li>
                        <li><NavLink to="/setting/privacy">Privacy</NavLink></li>
                        <li><NavLink to="/setting/theme">Theme</NavLink></li>
                        <li><NavLink to="">Logout</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default SideNavbar;