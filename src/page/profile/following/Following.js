import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import SideNavbar from '../../../core/sideNavbar/SideNavbar';
import Notify from '../../../core/Toast';
import Model2 from '../../../models/model2/Model2';
import { addFollowing, setFollowingList } from '../../../store/list/ListAction';
import "./Following.css"
import { HiBadgeCheck } from 'react-icons/hi';
const Following = () => {
    const [followingData, setFollowingData] = useState([])
    const { username } = useParams()
    const { auth } = useSelector(state => state.AuthReducer)
    const { following } = useSelector(state => state.ListReducer)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    useEffect(() => {
        async function getfolloweingData() {
            const following = await UserApi.getFollowingList(auth?.token, username)
            console.log(following)
            if (following.success) {
                setLoading(false)
                if (username == auth?.username) {
                    dispatch(setFollowingList(following.data))
                } else {
                    const data = following.data.map((ele) => {
                        return { ...ele, isFollowing: false }
                    })
                    setFollowingData(data)
                }
            } else {
                setLoading(false);
            }
        }
        getfolloweingData()
    }, [username])
    const handleFollowing = async (following_id, privacy_id) => {
        setBtnLoading(true);
        const response = await UserApi.followUser(auth?.token, following_id, privacy_id == 1 ? "confirm" : "pending")
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

    const unFollow = (follower_id) => {
        alert("fjbrhfrfr")
    }
    return (
        <>
            <div className='following'>
                <div className='container'>
                    <SideNavbar />
                    <div className="middle">
                        {loading ? <>
                            <Loader />
                        </> : <>
                            {auth?.username == username ? <>
                                {!following.length ? <><h1>No Data Found</h1></> : <>
                                    {following.map((ele) => {
                                        console.log(ele)
                                        return (
                                            <>
                                                <div className='follower_container'>
                                                    <div class="user_content">
                                                        <div class="user_profile">
                                                            <NavLink to={`/profile/${ele?.username}`}><img src={ele.profile} /></NavLink>
                                                        </div>
                                                        <div class="user_detail">
                                                            <p className="paragraph">{ele.username}{ele.badge ? <span className="badge"><HiBadgeCheck size="20" /></span> : ""}</p>
                                                            <p className="paragraph">{ele.email}</p>
                                                        </div>
                                                    </div>

                                                    <button className="btn" onClick={() => {
                                                        setId(ele?.username);
                                                        setIsOpen(true)
                                                    }}>{ele?.follow_status == "confirm" ? "Following" : "Requested"}</button>

                                                </div>
                                            </>
                                        )
                                    })}
                                </>}
                            </> : <>
                                {!followingData.length ? <><h1>No Data Found</h1></> : <>
                                    {followingData.map((ele) => {
                                        return (
                                            <>
                                                <div className='follower_container'>
                                                    <div className='follower'>
                                                        <div className='follower_profile'>
                                                            <img src={ele.profile} alt />
                                                        </div>
                                                        <div>
                                                            <h3>{ele.username}</h3>
                                                            <p>{ele.name}</p>
                                                        </div>
                                                    </div>
                                                    {following.some((el) => el._id == ele._id) ? <>
                                                        <button className='btn' onClick={() => {
                                                            setId(ele?.username);
                                                            setIsOpen(true)
                                                        }}>Following</button>
                                                    </> : <button className='btn' onClick={() => handleFollowing(ele._id, ele.privacy_id)}>Follow</button>}
                                                </div>
                                            </>
                                        )
                                    })}
                                </>}
                            </>}

                        </>}
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



                </div>
            </div>

            <Model2 username={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </>

    )
}
export default Following;