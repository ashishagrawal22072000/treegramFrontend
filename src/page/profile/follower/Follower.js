import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import "./Follower.css"
const Follower = () => {
    const [followerData, setFollowerData] = useState([])
    const { username } = useParams()
    const { auth } = useSelector(state => state.authSlice)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getfollowerData() {
            const follow = await UserApi.getFollowerList(auth?.token, username)
            if (follow.status == 200) {
                setLoading(false)
                setFollowerData(follow.data.data)
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
                                        {auth?.username == username ? <>
                                            <button>Remove</button>
                                        </> : <>
                                            <button>Follow</button>
                                        </>}
                                    </div>
                                </>
                            )
                        })}
                    </>}
                </>
                }

            </div>
        </>

    )
}
export default Follower;