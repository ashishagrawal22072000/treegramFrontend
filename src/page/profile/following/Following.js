import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import Notify from '../../../core/Toast';
import Model2 from '../../../models/model2/Model2';
import { setFollowingList } from '../../../store/list/ListAction';
import "./Following.css"
const Following = () => {
    const [followingData, setFollowingData] = useState([])
    const { username } = useParams()
    const { auth } = useSelector(state => state.AuthReducer)
    const { following } = useSelector(state => state.ListReducer)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
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
    const handleFollowing = async (following_id) => {
        console.log(following_id, "handleFollower")
        // setBtnLoading(true);

        const response = await UserApi.followUser(auth?.token, following_id)
        if (response.success) {

            // setBtnLoading(false)
            // // userList.map((user) => {
            // //     if (user._id == following_id) return user.isFollow = true
            // // })
            // dispatch(updateUserList(following_id, true))

            Notify("success", response.message)
        } else {
            // setBtnLoading(false)
            Notify("error", response.message)
        }
    }
    return (
        <>
            <div className='container'>
                {loading ? <>
                    <Loader />
                </> : <>
                    {auth?.username == username ? <>
                        {!following.length ? <><h1>No Data Found</h1></> : <>
                            {following.map((ele) => {
                                return (
                                    <>
                                        <div className='follower_container'>
                                            <div className='follower'>
                                                <div className='follower_profile'>
                                                    <img src={ele.follow_to?.profile} alt />
                                                </div>
                                                <div>
                                                    <h3>{ele.follow_to?.username}</h3>
                                                    <p>{ele.follow_to?.name}</p>
                                                </div>
                                            </div>

                                            <button onClick={() => {
                                                setId(ele.follow_to.username);
                                                setIsOpen(true)
                                            }}>Following</button>

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
                                            {following.includes(ele._id) ? <>
                                                <button>Following</button>
                                            </> : <button onClick={() => handleFollowing(ele._id)}>Follow</button>}
                                        </div>
                                    </>
                                )
                            })}
                        </>}
                    </>}
                    {/* {!following.length ? <><h1>No Data Found</h1></> : <>
                        {following.map((ele) => {
                            return (
                                <>
                                    <div className='follower_container'>
                                        <div className='follower'>
                                            <div className='follower_profile'>
                                                <img src={ele.follow_to.profile} alt />
                                            </div>
                                            <div>
                                                <h3>{ele.follow_to.username}</h3>
                                                <p>{ele.follow_to.name}</p>
                                            </div>
                                        </div>
                                        {auth?.username == username ? <>
                                            <button onClick={() => {
                                                setId(ele.follow_to.username);
                                                setIsOpen(true)
                                            }}>Remove</button>
                                        </> : <>
                                            <button>Follow</button>
                                        </>}
                                    </div>
                                </>
                            )
                        })}
                    </>} */}
                </>}


            </div>
            <Model2 username={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </>

    )
}
export default Following;