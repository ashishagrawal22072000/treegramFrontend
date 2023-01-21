import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import Loader from '../../core/loader/Loader';
import "./UserList.css"
import { HiBadgeCheck } from "react-icons/hi"
import ButtonLoader from '../../core/button-loader/ButtonLoader';
const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [followingList, setFollowingList] = useState([])
    const { auth } = useSelector(state => state.authSlice);
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [btnText, setBtnText] = useState('Follow')
    const navigate = useNavigate();
    useEffect(() => {
        async function followers() {
            const following = await UserApi.getFollowingList(auth.token)
            console.log("bfbfbfbf", following)
            setFollowingList(following.data.data)
        }
        followers();
    }, [])

    useEffect(() => {
        console.log(followingList, "followewew")
        if (followingList.length) {
            navigate("/")
        } else {
            async function users() {
                const users = await UserApi.getUserList(auth.token)
                setLoading(false)
                setUserList(users.data.data)
            }
            users()
        }

    }, [followingList])

    const handleFollowing = async (following_id) => {
        console.log(following_id, "handleFollower")
        setBtnLoading(true);
        const response = await UserApi.followUser(auth.token, following_id)
        console.log(response);
    }

    return (
        <>
            <section class="userlist">
                <div class="userlist_content">
                    {
                        loading ?
                            <>
                                <div className="">
                                    <Loader />
                                </div>
                            </>
                            :
                            <>
                                <section className="userList">
                                    <div className="container">
                                        <div className="user-content">
                                            <p>Suggestions For You</p>
                                            <hr />
                                            {userList.map((ele) => {
                                                return (
                                                    <>
                                                        <div class="container">
                                                            <div class="user_content">
                                                                <div class="user_profile">
                                                                    <img src={ele.profile} height="50" width="50" />

                                                                </div>
                                                                <div class="user_detail">
                                                                    <p className="paragraph">{ele.username}{ele.badge ? <span><HiBadgeCheck color="#645bff" size="20" /></span> : ""}</p>
                                                                    <p className="paragraph">{ele.email}</p>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => handleFollowing(ele._id)}>
                                                                {btnLoading ? <ButtonLoader /> : btnText}
                                                                <div class="arrow-wrapper">
                                                                    <div class="arrow"></div>
                                                                </div>
                                                            </button>

                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </section>
                                <div className="btn_container">
                                    <button className="submit">Get Started</button>
                                </div>

                            </>
                    }

                </div>
            </section>
        </>
    )
}
export default UserList;