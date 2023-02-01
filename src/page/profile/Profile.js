import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import InnerNavbar from '../../core/innerNavbar/InnerNavbar';
import "./Profile.css";
import { RiGridFill, RiVideoFill, RiBookmarkFill } from "react-icons/ri"
import Post from './post/Post';
import Saved from './saved/Saved';
import Tagged from './tagged/Tagged';
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../api/UserApi';
import Loader from '../../core/loader/Loader';
import { addFollowing, removeFollowing } from '../../store/list/ListAction';
import Notify from '../../core/Toast';
import { HiBadgeCheck } from "react-icons/hi"
import { AiTwotoneSetting } from "react-icons/ai"
const Profile = () => {
    const { auth } = useSelector(state => state.AuthReducer)
    const { following } = useSelector(state => state.ListReducer);
    console.log(following)
    const [userData, setUserData] = useState({})
    const [tab, setTab] = useState(1);
    const { username } = useParams()
    const [loading, setLoading] = useState(true);
    const [BtnLoading, setBtnLoading] = useState(false)
    const dispatch = useDispatch();
    const showTab = () => {
        switch (tab) {
            case 1: return <Post />
            case 2: return <Saved />
            case 3: return <Tagged />
            default: return null
        }
    }
    useEffect(() => {
        async function getUserData() {
            const user = await UserApi.getUserProfileDetail(auth?.token, username)
            if (user.success) {
                setLoading(false);
                setUserData(user.data)
            } else {
                setLoading(false);
            }
        }
        getUserData()
    }, [username])
    useEffect(() => {

        showTab();
    }, [tab])

    // const location = useLocation()
    console.log(window.location.pathname + "/edit", userData)

    const handleFollow = async (follower_id, privacy_id) => {
        setBtnLoading(true);
        const response = await UserApi.followUser(auth?.token, follower_id, privacy_id == 1 ? "confirm" : "pending")
        if (response.success) {
            dispatch(addFollowing(response.data))
            setBtnLoading(false)
            // dispatch(updateUserList(following_id, true))
            Notify("success", response.message)
        } else {
            setBtnLoading(false)
            Notify("error", response.message)
        }
    }
    const unfollow = async (follower_id) => {
        setBtnLoading(true);
        const response = await UserApi.followUser(auth?.token, follower_id, "cancel")
        if (response.success) {
            dispatch(removeFollowing(response.data))
            setBtnLoading(false)
            Notify("success", response.message)
        } else {
            setBtnLoading(false)
            Notify("error", response.message)
        }
    }
    return (

        <>

            <div className="container">
                {loading ? <>
                    <Loader />
                </> : <>
                    {!Object.keys(userData).length ? <>
                        <h1>No Data Found</h1>
                    </> : <>
                        <section className="profile">
                            <div className="user_detail1">
                                <div className="profile">
                                    <img src={userData?.user?.profile} height={150} width={150} alt="" />
                                    <div className="profile_content">
                                        <h2>{userData?.user?.username}{userData?.user?.badge ? <span><HiBadgeCheck color="#645bff" size="20" /></span> : ""}</h2>
                                        <br />
                                        {auth?.username == username ? <>
                                            <div className="setting_btn">
                                                <NavLink to={`${window.location.pathname}/edit`}><button>Edit Profile</button></NavLink>
                                                <span><NavLink to="/setting"><AiTwotoneSetting size={30} /></NavLink></span>
                                            </div>

                                        </> : <>
                                            {following?.some((ele) => ele._id == userData?.user?._id) ? <button onClick={() => unfollow(userData?.user?._id)}>
                                                {following?.some((ele) => ele._id == userData?.user?._id && ele.follow_status == "confirm") ? "Following" : "Requested"}
                                            </button> : <button onClick={() => handleFollow(userData?.user?._id, userData?.user?.privacy_id)}>Follow</button>}
                                        </>}
                                    </div>
                                </div>
                                <div className="profile_content">
                                    {console.log(userData)}
                                    <p>{userData?.user?.website}</p>
                                    <p>{userData?.user?.bio}</p>
                                </div>
                            </div>

                            <hr />
                            <div className="user_detail2">
                                <NavLink to={`${window.location.pathname}/post`} className={(nav) => nav.isActive ? '.link' : ''}>
                                    <div>
                                        <p>0</p>
                                        <p>Post</p>
                                    </div>
                                </NavLink>
                                <NavLink to={`${window.location.pathname}/follower`} className={(nav) => nav.isActive ? '.link' : ''}>
                                    <div>
                                        <p>{userData?.follower}</p>
                                        <p>Follower</p>
                                    </div>
                                </NavLink>
                                <NavLink to={`${window.location.pathname}/following`} className={(nav) => nav.isActive ? '.link' : ''}>
                                    <div>
                                        <p>{userData?.following}</p>
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
                        {userData?.user?.username == auth?.username ? <>{showTab()}</> : <>
                            {(userData?.user?.privacy_id == 2 && following.some((ele) => ele._id == userData?.user?._id && ele.follow_status == "confirm") || userData?.user?.privacy_id == 1) ? <>
                                {showTab()}
                            </> : <>
                                <h1>This Account is Private</h1>
                            </>}
                        </>}
                    </>}
                </>}


            </div>
            <InnerNavbar />
        </>
    )
}
export default Profile