import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import Notify from '../../../core/Toast';
import Model2 from '../../../models/model2/Model2';
import { setFollowerList, updateFollowerList } from '../../../store/list/ListAction';
import "./Follower.css"
const Follower = () => {
    const [followerData, setFollowerData] = useState([])
    const { username } = useParams()
    const { auth } = useSelector(state => state.AuthReducer)
    const [loading, setLoading] = useState(true);
    const { follower } = useSelector(state => state.ListReducer)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
    const dispatch = useDispatch()
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
                                                    <img src={ele.follow_from?.profile} alt />
                                                </div>
                                                <div>
                                                    <h3>{ele.follow_from?.username}</h3>
                                                    <p>{ele.follow_from?.name}</p>
                                                </div>
                                            </div>
                                            <button onClick={async () => {
                                                // setId(ele.follow_from?.username);
                                                // setIsOpen(true)
                                                const response = await UserApi.followUser(auth?.token, ele.follow_from?._id)
                                                if (response.success) {
                                                    Notify("success", response.message)
                                                    dispatch(updateFollowerList(ele.follow_from?._id))
                                                    // userList.map((user) => {
                                                    //     if (user._id == userDetail._id) return user.isFollow = false
                                                    // })
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

                                            <button>Follow</button>

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
            {/* <Model2 username={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} /> */}

        </>

    )
}
export default Follower;