import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import Loader from '../../core/loader/Loader';
import "./UserList.css"
import { HiBadgeCheck } from "react-icons/hi"
import ButtonLoader from '../../core/button-loader/ButtonLoader';
import Notify from "../../core/Toast"
import { RiArrowDropDownLine } from "react-icons/ri"
import Model1 from '../../models/model1/Model1';
import { addFollowing, getUserList, updateUserList, setFollowingList } from '../../store/list/ListAction';
const UserList = ({ setFollowerList }) => {
    const [id, setId] = useState('');
    const [model, setModel] = useState(false)
    const [userList, setUserList] = useState([]);
    // const [followingList, setFollowingList] = useState([])
    const { auth } = useSelector(state => state.AuthReducer);
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [page, setPage] = useState(20)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user, following } = useSelector(state => state.ListReducer)
    console.log(user)
    useEffect(() => {
        async function followers() {
            const following = await UserApi.getFollowingList(auth?.token, auth?.username)
            if (following.success) {
                console.log(following.data)
                if (following.data.length) setFollowerList(true)
                dispatch(setFollowingList(following.data))

            }
        }
        followers();
    }, [])
    // const handleScrollEffect = () => {
    //     console.log(document.documentElement.scrollHeight, "scrollheight")
    //     console.log(window.innerHeight, "innerheight")
    //     console.log(document.documentElement.scrollTop, "scrollTop")
    //     try {
    //         if (window.innerHeight + document.documentElement.scrollHeight + 1 >= document.documentElement.scrollTop) {
    //             setPage(page + 5)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    useEffect(() => {
        // window.addEventListener("scroll", handleScrollEffect)
        async function users() {
            const users = await UserApi.getUserList(auth?.token, page, 0)
            if (users.success) {
                setLoading(false)
                const data = users.data.map((ele) => {
                    return { ...ele, isFollow: false }
                })
                dispatch(getUserList(data))

            }
            // const data = users.data.data.map((ele) => {
            //     return { ...ele, isFollow: false }
            // })
            // setUserList(data)
        }
        users()


    }, [page])

    const handleFollowing = async (following_id) => {
        console.log(following_id, "handleFollower")
        setBtnLoading(true);

        const response = await UserApi.followUser(auth?.token, following_id, "confirm")
        if (response.success) {
            dispatch(addFollowing(response.data))
            setBtnLoading(false)
            dispatch(updateUserList(following_id, true))
            Notify("success", response.message)
        } else {
            setBtnLoading(false)
            Notify("error", response.message)
        }
    }
    const [modalIsOpen, setIsOpen] = useState(false);
    console.log(userList, "usususus")
    return (
        <>
            <div className="container">

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
                                        <div className="user-content">
                                            <p>Suggestions For You</p>
                                            <hr />
                                            {user.map((ele, i) => {
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
                                    </section>
                                    <div className="btn_container">
                                        <button className="submit" onClick={() => {
                                            if (following.length) setFollowerList(true)
                                        }}>Get Started</button>
                                    </div>




                                </>
                        }

                    </div>
                </section>
            </div>

            <Model1 username={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setUserList={setUserList} userList={userList} />


        </>
    )
}
export default UserList;
