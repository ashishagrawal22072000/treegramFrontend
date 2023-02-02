import React, { useEffect } from 'react';
import { ImHome, ImUser } from "react-icons/im"
import { BsSearch } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi"
import { MdNotifications, MdExplore } from "react-icons/md"
import "./InnerNavbar.css"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from "../.././assets/images/img/home.svg"
import Explore from "../.././assets/images/img/explore.svg"
import Search from "../.././assets/images/img/search.svg"
import Reel from "../.././assets/images/img/film.svg"
import Notification from "../.././assets/images/img/bell.svg"
import Setting from "../.././assets/images/img/setting.svg"
import Analysis from "../.././assets/images/img/statistics.svg"
import Create from "../.././assets/images/img/add.svg"
const InnerNavbar = () => {
    const profile = localStorage.getItem('profile');
    // const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user, "abc")
    const { auth } = useSelector((state) => state.AuthReducer);
    const auth_token = localStorage.getItem('auth-token')
    return (
        <>
            <div className="container">

                <header>
                    <nav>
                        <ul>
                            <NavLink to="/"><li><img src={Home} height="25" width="25" /></li></NavLink>
                            <NavLink to="/exlore"><img src={Explore} height="25" width="25" /></NavLink>
                            <NavLink to="/search"><li><img src={Search} height="25" width="25" /></li></NavLink>
                            <NavLink to="/reels"><li><img src={Reel} height="25" width="25" /></li></NavLink>
                            <NavLink to="/search"><li><img src={Create} height="25" width="25" /></li></NavLink>
                            <NavLink to="/notification"><li><img src={Notification} height="25" width="25" /></li></NavLink>
                            <NavLink to="/setting"><li><img src={Setting} height="25" width="25" /></li></NavLink>
                            <NavLink to="/notification"><li><img src={Analysis} height="25" width="25" /></li></NavLink>
                            <NavLink to={`/profile/${auth.username}`}><li>{auth && auth.profile ? <img src={auth.profile} height="30" width="30" /> : <img src={Search} height="25" width="25" />}</li></NavLink>

                        </ul>
                    </nav>

                </header>
            </div>

        </>
    )
}
export default InnerNavbar;