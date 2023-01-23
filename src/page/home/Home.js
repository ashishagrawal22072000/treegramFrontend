import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserApi from "../../api/UserApi";
import InnerNavbar from "../../core/innerNavbar/InnerNavbar";
import Login from "../login/Login";
// import UserList from "../../core/user-list/UserList";

const Home = () => {
    const { auth } = useSelector(state => state.authSlice)
    const auth_token = localStorage.getItem('auth-token');
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
            {!auth_token ? <>
                <Login /> </> : <>
                <InnerNavbar />

            </>
            }
        </>
    )
};
export default Home;
