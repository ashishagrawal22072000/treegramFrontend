import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import Loader from '../../core/loader/Loader';
import "./UserList.css"
import { HiBadgeCheck } from "react-icons/hi"
import ButtonLoader from '../../core/button-loader/ButtonLoader';
import Notify from "../../core/Toast"
import { RiArrowDropDownLine } from "react-icons/ri"
import Model1 from '../../models/model1/Model1';
const UserList = () => {
    const [id, setId] = useState('');
    console.log(id, "ffbfbfbf")
    const [model, setModel] = useState(false)
    const [userList, setUserList] = useState([]);
    const [followingList, setFollowingList] = useState([])
    const { auth } = useSelector(state => state.authSlice);
    const auth_token = localStorage.getItem("auth-token")
    console.log("auth token: " + auth_token)
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    // const [btnText, setBtnText] = useState('Follow')
    // const [followList, setFollowerList] = useState([])
    const [page, setPage] = useState(10)
    const navigate = useNavigate();
    useEffect(() => {
        async function followers() {
            const following = await UserApi.getFollowingList(auth_token)
            console.log("bfbfbfbf", following)
            setFollowingList(following.data.data)
        }
        followers();
    }, [])
    const handleScrollEffect = () => {
        console.log(document.documentElement.scrollHeight, "scrollheight")
        console.log(window.innerHeight, "innerheight")
        console.log(document.documentElement.scrollTop, "scrollTop")
        try {
            if (window.innerHeight + document.documentElement.scrollHeight + 1 >= document.documentElement.scrollTop) {
                setPage(page + 5)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        console.log(followingList, "followewew")
        if (followingList.length) {
            navigate("/")
        } else {
            window.addEventListener("scroll", handleScrollEffect)
            async function users() {
                const users = await UserApi.getUserList(auth_token, page, 0)
                setLoading(false)
                const data = users.data.data.map((ele) => {
                    return { ...ele, isFollow: false }
                })
                setUserList(data)
            }
            users()
        }

    }, [followingList, page])

    const handleFollowing = async (following_id) => {
        console.log(following_id, "handleFollower")
        setBtnLoading(true);

        const response = await UserApi.followUser(auth_token, following_id)
        if (response.status == 200) {
            // setBtnText("Following")
            setBtnLoading(false)
            userList.map((user) => {
                if (user._id == following_id) return user.isFollow = true
            })
            // console.log(data)
            // setFollowerList([...followList, following_id])
            Notify("success", response.data.message)
        } else {
            setBtnLoading(false)
            Notify("error", response.data.message)
        }
    }
    const [modalIsOpen, setIsOpen] = useState(false);
    console.log(userList, "usususus")
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
                                            {userList.map((ele, i) => {
                                                return (
                                                    <>
                                                        <div class="container" key={ele._id}>
                                                            <div class="user_content">
                                                                <div class="user_profile">
                                                                    <img src={ele.profile} height="50" width="50" />

                                                                </div>
                                                                <div class="user_detail">
                                                                    <p className="paragraph">{ele.username}{ele.badge ? <span><HiBadgeCheck color="#645bff" size="20" /></span> : ""}</p>
                                                                    <p className="paragraph">{ele.email}</p>
                                                                </div>
                                                            </div>
                                                            {!ele.isFollow ? <button onClick={() => handleFollowing(ele._id)}>
                                                                Follow

                                                            </button> : <button onClick={() => {
                                                                setId(ele.username);
                                                                setIsOpen(true)
                                                            }} >Following <RiArrowDropDownLine size={20} /></button>}

                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </section>
                                <div className="btn_container">
                                    <button className="submit"><NavLink to="/">Get Started</NavLink></button>
                                </div>




                            </>
                    }

                </div>
            </section>


            <Model1 username={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />


        </>
    )
}
export default UserList;