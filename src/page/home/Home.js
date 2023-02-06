import React, { useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import UserApi from "../../api/UserApi";
import InnerNavbar from "../../core/innerNavbar/InnerNavbar";
import SideNavbar from "../../core/sideNavbar/SideNavbar";
import Login from "../login/Login";
import Post from "../post/Post";
import UserList from "../user-list/UserList";
// import UserList from "../../core/user-list/UserList";

const Home = () => {
    const { auth } = useSelector(state => state.AuthReducer)
    // const { following } = useSelector(state => state.ListReducer)
    const [followerList, setFollowerList] = useState(false)
    console.log(process.env)
    const navigate = useNavigate()
    return (

        <>
            {!auth?.token ? <>
                <Login /> </> : <>
                <div className="container">
                    {!followerList ? <UserList setFollowerList={setFollowerList} /> :
                        <>
                            <SideNavbar />
                            <div className="middle">
                                <Post />
                            </div>
                            <div className="right">
                                <h2>Suggestions</h2>
                                <div className="suggestion">

                                    <div class="user_content">
                                        <div class="user_profile">
                                            <NavLink><img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" /></NavLink>
                                        </div>
                                        <div class="user_detail">
                                            <p className="paragraph">A_12shish<span><HiBadgeCheck color="#645bff" size="20" /></span></p>
                                            <p className="paragraph">Ashish</p>
                                        </div>
                                    </div>
                                    <button className="btn">Follow</button>


                                </div>
                                <div className="suggestion">

                                    <div class="user_content">
                                        <div class="user_profile">
                                            <NavLink><img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" /></NavLink>
                                        </div>
                                        <div class="user_detail">
                                            <p className="paragraph">A_12shish<span><HiBadgeCheck color="#645bff" size="20" /></span></p>
                                            <p className="paragraph">Ashish</p>
                                        </div>
                                    </div>
                                    <button className="btn">Follow</button>


                                </div>
                            </div>
                        </>
                    }
                </div>


            </>
            }
        </>
    )
};
export default Home;
