import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserApi from "../../api/UserApi";
// import UserList from "../../core/user-list/UserList";

const Home = () => {
    const { auth } = useSelector(state => state.authSlice)
    const [followerList, setFollowerList] = useState([])
    useEffect(() => {
        async function followers() {
            const follower = await UserApi.getFollowerList(auth.token)
            setFollowerList(follower.data.data)
        }
        followers()
    }, [])
    return (

        <>
            {/* <UserList /> */}
        </>
    )
};
export default Home;
