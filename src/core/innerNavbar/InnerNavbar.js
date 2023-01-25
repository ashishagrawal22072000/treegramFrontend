import React, { useEffect } from 'react';
import { ImHome, ImUser } from "react-icons/im"
import { BsSearch } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi"
import { MdMessage } from "react-icons/md"
import "./InnerNavbar.css"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const InnerNavbar = () => {
    const profile = localStorage.getItem('profile');
    const user = localStorage.getItem('user');
    const { auth } = useSelector((state) => state.authSlice);
    const auth_token = localStorage.getItem('auth-token')
    return (
        <>
            <div className="container">

                <header>
                    <nav>
                        <ul>
                            <NavLink to="/"><li><ImHome size={20} color="#645bff" /></li></NavLink>
                            <NavLink to="/search"><li><BsSearch size={20} color="#645bff" /></li></NavLink>
                            <NavLink to="/reels"><li><FiYoutube size={20} color="#645bff" /></li></NavLink>
                            <NavLink to="/message"><li><MdMessage size={20} color="#645bff" /></li></NavLink>
                            <NavLink to={`/profile/${user}`}><li>{profile ? <img src={profile} height="30" width="30" /> : <ImUser size={20} color="#645bff" />}</li></NavLink>
                        </ul>
                    </nav>

                </header>
            </div>

        </>
    )
}
export default InnerNavbar;