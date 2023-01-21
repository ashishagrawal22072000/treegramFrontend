import React, { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { AiTwotoneStar, AiFillCloseCircle } from "react-icons/ai"
import "./Model1.css"
const Model1 = ({ username }) => {
    const [userDetail, setUserDetail] = useState({})
    const [close, setClose] = useState('block')
    const auth_token = localStorage.getItem('auth-token');
    useEffect(() => {
        async function fetchUser() {
            const response = await UserApi.getAuthUserdetail(auth_token, username);
            console.log(response, "modeldata")
            if (response.status == 200) {
                setUserDetail(response.data.data)
            }
        }
        fetchUser()
    }, [])
    return (
        <>
            <div className="model" style={{ "display": `${close}` }}>
                <div className="model_container">
                    <button><AiFillCloseCircle size={20} color="black" onClick={() => { setClose('none') }} /></button>
                    <div className="model_header">
                        <div>
                            <img src={userDetail.profile} height="50" width="50" />
                        </div>
                        <p>{userDetail.username}</p>
                    </div>
                    <hr />
                    <div className="model_body">
                        <div className="model_item">
                            <p>Add to close friend list</p>
                            <AiTwotoneStar />
                        </div>
                        <div className="model_item">
                            <p>Add to favouriate</p>
                            <AiTwotoneStar />
                        </div>
                        <div className="model_item">
                            <p>unfollow</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Model1;