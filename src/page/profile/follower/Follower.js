import React, { useEffect, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import SideNavbar from '../../../core/sideNavbar/SideNavbar';
import Notify from '../../../core/Toast';
import Model2 from '../../../models/model2/Model2';
import { addFollowing, removeFollower, setFollowerList, updateFollowerList } from '../../../store/list/ListAction';
import "./Follower.css"
import Dustbin from "../../../assets/images/img/delete.svg";

const Follower = () => {
    const [followerData, setFollowerData] = useState([])
    const { username } = useParams()
    const { auth } = useSelector(state => state.AuthReducer)
    const [loading, setLoading] = useState(true);
    const { follower, following } = useSelector(state => state.ListReducer)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
    const dispatch = useDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    useEffect(() => {
        async function getfollowerData() {
            const follow = await UserApi.getFollowerList(auth?.token, username)
            console.log(follow.data, "abc")
            if (follow.success) {
                setLoading(false)
                if (username == auth?.username) {
                    console.log(follow.data)
                    dispatch(setFollowerList(follow.data))
                } else {
                    setFollowerData(follow.data)
                }
            } else {
                setLoading(false);
            }
        }
        getfollowerData()
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
    return (
        <>
            <div className="follower">
                <div className='container'>
                    <SideNavbar />
                    <div className="middle">
                        {loading ? <>
                            <Loader />
                        </> : <>
                            {auth?.username == username ? <>
                                {!follower.length ? <><h1>No Data Found</h1></> : <>
                                    {follower.map((ele) => {
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
                                                    <img src={Dustbin} height="20" width="20" onClick={async () => {
                                                        const response = await UserApi.DeleteFollower(auth?.token, ele._id)
                                                        if (response.success) {
                                                            Notify("success", response.message)
                                                            dispatch(removeFollower(ele._id))
                                                        } else {
                                                            Notify("error", response.message)
                                                        }
                                                    }} />
                                                </div>
                                            </>
                                        )
                                    })}
                                </>}
                            </> : <>
                                {!followerData.length ? <><h1>No Data Found</h1></> : <>
                                    {followerData.map((ele) => {
                                        return (
                                            <>
                                                <div className='follower_container'>
                                                    <div className='follower'>
                                                        <div className='follower_profile'>
                                                            <img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" alt />
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

                        </>
                        }
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
export default Follower;