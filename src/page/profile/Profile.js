import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import InnerNavbar from '../../core/innerNavbar/InnerNavbar';
import "./Profile.css";
import { RiGridFill, RiVideoFill, RiBookmarkFill } from "react-icons/ri"
import Post from './post/Post';
import Saved from './saved/Saved';
import Tagged from './tagged/Tagged';
const Profile = () => {
    const user_profile = localStorage.getItem('profile');
    const [tab, setTab] = useState(1);
    const showTab = () => {
        switch (tab) {
            case 1: return <Post />
            case 2: return <Saved />
            case 3: return <Tagged />
            default: return null
        }
    }
    useEffect(() => {

        showTab();
    }, [tab])
    return (
        <>

            <div className="container">
                <section className="profile">
                    <div className="user_detail1">
                        <div className="profile">
                            <img src={user_profile} height={150} width={150} alt="" />
                            <div className="profile_content">
                                <h2>_user1</h2>
                                <br />
                                <button>Edit Profile</button>
                            </div>
                        </div>
                        <div className="profile_content">
                            <p>Add Website</p>
                            <p>Add Bio</p>
                        </div>
                    </div>

                    <hr />
                    <div className="user_detail2">
                        <NavLink to="/post" className={(nav) => nav.isActive ? '.link' : ''}>
                            <div>
                                <p>0</p>
                                <p>Post</p>
                            </div>
                        </NavLink>
                        <NavLink to="/follower" className={(nav) => nav.isActive ? '.link' : ''}>
                            <div>
                                <p>0</p>
                                <p>Follower</p>
                            </div>
                        </NavLink>
                        <NavLink to="/following" className={(nav) => nav.isActive ? '.link' : ''}>
                            <div>
                                <p>0</p>
                                <p>Following</p>
                            </div>
                        </NavLink>

                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="user_detail3">

                        <div>
                            <RiGridFill size={20} color="#645bff" onClick={() => { setTab(1) }} />
                        </div>


                        <div>
                            <RiVideoFill size={20} color="#645bff" onClick={() => { setTab(2) }} />
                        </div>


                        <div>
                            <RiBookmarkFill size={20} color="#645bff" onClick={() => { setTab(3) }} />
                        </div>

                    </div>
                </section>

                {showTab()}

            </div>
            <InnerNavbar />
        </>
    )
}
export default Profile