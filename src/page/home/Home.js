import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserApi from "../../api/UserApi";
import InnerNavbar from "../../core/innerNavbar/InnerNavbar";
import Login from "../login/Login";
import UserList from "../user-list/UserList";
// import UserList from "../../core/user-list/UserList";

const Home = () => {
    const { auth } = useSelector(state => state.authSlice)
    const [followerList, setFollowerList] = useState([])
    const navigate = useNavigate()
    // useEffect(() => {
    //     async function followers() {
    //         const follower = await UserApi.getFollowerList(auth?.token, auth?.username)
    //         setFollowerList(follower.data.data)
    //     }
    //     followers()
    // }, [])
    // console.log(followerList, "fhfhfhfhfh")
    // useEffect(() => {
    //     if (!followerList.length) navigate("/add-user")
    // }, [followerList])
    return (

        <>
            {!auth?.token ? <>
                <Login /> </> : <>
                <UserList />
                <InnerNavbar />

            </>
            }
        </>
    )
};
export default Home;
