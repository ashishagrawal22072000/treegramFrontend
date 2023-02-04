import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
// import './SideNavbar.css';
import { IconContext } from 'react-icons';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
import { RiLockPasswordFill } from "react-icons/ri"
import { FiActivity } from "react-icons/fi"
import { TbReport } from "react-icons/tb"
import Home from "../../assets/images/img/home.svg"
import Search from "../../assets/images/img/search.svg"
import Explore from "../../assets/images/img/explore.svg"
import Reel from "../../assets/images/img/film.svg"
import Create from "../../assets/images/img/add.svg"
import Notification from "../../assets/images/img/bell.svg"
import Analysis from "../../assets/images/img/statistics.svg"
import Setting from "../../assets/images/img/setting.svg"
import UserProfile from "../../assets/images/img/Vector.svg"
import { useSelector } from 'react-redux';

function SideNavbar() {
    const { auth } = useSelector((state) => state.AuthReducer);

    return (
        <>
            <div className="left">
                <div className="sidebar">
                    <NavLink className="logo" to="/">
                        <h1>Treegram</h1>
                    </NavLink>
                    <NavLink to="/" className={(navlink) => {
                        console.log(navlink.isActive, "1")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Home} /></span><h3 className="link_name">Home</h3>
                    </NavLink>
                    <NavLink to="/search" className={(navlink) => {
                        console.log(navlink.isActive, "2")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Search} /></span><h3 className="link_name">Search</h3>
                    </NavLink>
                    <NavLink to="/explore" className={(navlink) => {
                        console.log(navlink.isActive, "3")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Explore} /></span><h3 className="link_name">Explore</h3>
                    </NavLink>
                    <NavLink to="/reel" className={(navlink) => {
                        console.log(navlink.isActive, "4")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Reel} /></span><h3 className="link_name">Reels</h3>
                    </NavLink>
                    <NavLink to="/create" className={(navlink) => {
                        console.log(navlink.isActive, "5")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Create} /></span><h3 className="link_name">Create</h3>
                    </NavLink>
                    <NavLink to="/notification" className={(navlink) => {
                        console.log(navlink.isActive, "6")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Notification} /></span><h3 className="link_name">Notification</h3>
                    </NavLink>
                    <NavLink to="/analysis" className={(navlink) => {
                        console.log(navlink.isActive, "7")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Analysis} /></span><h3 className="link_name">Analysis</h3>
                    </NavLink>
                    <NavLink to="/setting" className={(navlink) => {
                        console.log(navlink.isActive, "8")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item"><img src={Setting} /></span><h3 className="link_name">Settings</h3>
                    </NavLink>
                    <NavLink to={`/profile/${auth?.username}`} className={(navlink) => {
                        console.log(navlink.isActive, "9")
                        return navlink.isActive ? "menu-item active" : "menu-item"
                    }}>
                        <span className="item">{auth && auth?.profile ? <img src={auth?.profile} /> : <img src={UserProfile} />}</span><h3 class="link_name">Profile</h3>
                    </NavLink>
                </div>
            </div>

            {/* <div value={{ color: '#fff' }}>
                <div className='navbar'>
                    <h2>Treegram</h2>
                    <NavLink to='#' className='menu-bars'>
                        <RxHamburgerMenu onClick={showSidebar} />
                    </NavLink>

                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        
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
            </div> */}
        </>
    );
}

export default SideNavbar;