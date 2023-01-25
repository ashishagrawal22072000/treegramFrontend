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
    const [followerList, setFollowerList] = useState(false)
    const navigate = useNavigate()
    return (

        <>
            {!auth?.token ? <>
                <Login /> </> : <>
                {!followerList ? <UserList setFollowerList={setFollowerList} /> :
                    <InnerNavbar />

                }

            </>
            }
        </>
    )
};
export default Home;
