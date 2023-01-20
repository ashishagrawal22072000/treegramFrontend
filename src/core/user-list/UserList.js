import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserApi from '../../api/UserApi';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const { auth } = useSelector(state => state.authSlice)

    useEffect(() => {

        async function users() {
            const users = await UserApi.getUserList(auth.token)
            console.log(users)
            setUserList(users.data.data)
        }
        users()
    }, [])
    console.log(userList)
    return (
        <>
            {userList.map((ele) => {
                return (
                    <>
                        <div class="container">
                            <div class="user_content">
                                <div class="user_profile">
                                    <img src={ele.profile} height="50" width="50" />

                                </div>
                                <div class="user_detail">
                                    <h4>{ele.username}</h4>
                                    <p>{ele.email}</p>
                                </div>
                            </div>
                            <div class="button">
                                <button>Follow</button>
                            </div>

                        </div>
                    </>
                )
            })}
        </>
    )
}
export default UserList;