import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import Notify from '../../../core/Toast';
import Model2 from '../../../models/model2/Model2';
import { addFollowing, removeFollower, setFollowerList, updateFollowerList } from '../../../store/list/ListAction';
import "./Follower.css"
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
        // console.log(following_id, "handleFollower")
        // // setBtnLoading(true);

        // const response = await UserApi.followUser(auth?.token, following_id)
        // if (response.success) {

        //     // setBtnLoading(false)
        //     // // userList.map((user) => {
        //     // //     if (user._id == following_id) return user.isFollow = true
        //     // // })
        //     // dispatch(updateUserList(following_id, true))

        //     Notify("success", response.message)
        // } else {
        //     // setBtnLoading(false)
        //     Notify("error", response.message)
        // }
    }
    return (
        <>
            <div className='container'>
                {loading ? <>
                    <Loader />
                </> : <>
                    {auth?.username == username ? <>
                        {!follower.length ? <><h1>No Data Found</h1></> : <>
                            {follower.map((ele) => {
                                return (
                                    <>
                                        <div className='follower_container'>
                                            <div className='follower'>
                                                <div className='follower_profile'>
                                                    <img src={ele?.profile} alt />
                                                </div>
                                                <div>
                                                    <h3>{ele?.username}</h3>
                                                    <p>{ele?.name}</p>
                                                </div>
                                            </div>
                                            <button onClick={async () => {
                                                const response = await UserApi.DeleteFollower(auth?.token, ele._id)
                                                if (response.success) {
                                                    Notify("success", response.message)
                                                    dispatch(removeFollower(ele._id))
                                                } else {
                                                    Notify("error", response.message)
                                                }
                                            }}>Remove</button>
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
                                                <button onClick={() => {
                                                    setId(ele?.username);
                                                    setIsOpen(true)
                                                }}>Following</button>
                                            </> : <button onClick={() => handleFollowing(ele._id, ele.privacy_id)}>Follow</button>}

                                        </div>
                                    </>
                                )
                            })}
                        </>}
                    </>}
                    {/* {!follower.length ? <><h1>No Data Found</h1></> : <>
                        {follower.map((ele) => {
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
                                        {auth?.username == username ? <>
                                            <button>Unfollow</button>
                                        </> : <>
                                            <button>Follow</button>
                                        </>}
                                    </div>
                                </>
                            )
                        })}
                    </>} */}
                </>
                }

            </div>
            <Model2 username={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

        </>

    )
}
export default Follower;