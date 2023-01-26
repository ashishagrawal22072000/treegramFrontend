import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../core/loader/Loader';
import "./Following.css"
const Following = () => {
    const [followingData, setFollowingData] = useState([])
    const { username } = useParams()
    const { auth } = useSelector(state => state.authSlice)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getfolloweingData() {
            const following = await UserApi.getFollowingList(auth?.token, username)
            if (following.status == 200) {
                setLoading(false)
                setFollowingData(following.data.data)
                console.log(followingData, "fjfjrhf")

            } else {
                setLoading(false);
            }
        }
        getfolloweingData()
    }, [username])
    console.log(followingData, "fjfjrhf")

    return (
        <>
            <div className='container'>
                {loading ? <>
                    <Loader />
                </> : <>
                    {!followingData.length ? <><h1>No Data Found</h1></> : <>
                        {followingData.map((ele) => {
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
                                            <button>Remove</button>
                                        </> : <>
                                            <button>Follow</button>
                                        </>}
                                    </div>
                                </>
                            )
                        })}
                    </>}
                </>}


            </div>
        </>

    )
}
export default Following;