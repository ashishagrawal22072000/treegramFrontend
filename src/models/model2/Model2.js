import React, { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { AiTwotoneStar, AiFillCloseCircle } from "react-icons/ai"
import "./Model2.css"
import Modal from 'react-modal';
import Notify from "../../core/Toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFollowing, updateFollowingList, updateUserList } from "../../store/list/ListAction";
const Model2 = ({ modalIsOpen, setIsOpen, username, setUserList, userList }) => {
    console.log(username, "modal");
    const [userDetail, setUserDetail] = useState({})
    const [close, setClose] = useState('block')
    const { auth } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("dghdgdgdgdgdgd")
        async function fetchUser() {
            const response = await UserApi.getUserBySearch(auth?.token, username);
            console.log(response, "modeldata")
            if (response.success) {
                setUserDetail(...response.data)
            }
        }
        fetchUser()
    }, [username])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "350px",
            width: "350px"
        },
    };

    // const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    // const AddToCloseFriend = async () => {
    //     const response = await UserApi.AddCloseFriend(auth?.token, userDetail._id)
    //     if (response.status == 200) {
    //         Notify("success", response.data.message)
    //     } else {
    //         Notify("error", response.data.message)
    //     }
    // }
    // const AddToFavouriate = async () => {
    //     const response = await UserApi.AddFavouriate(auth?.token, userDetail._id)
    //     if (response.status == 200) {
    //         Notify("success", response.data.message)
    //     } else {
    //         Notify("error", response.data.message)
    //     }
    // }
    const AddToUnfollow = async () => {
        const response = await UserApi.followUser(auth?.token, userDetail._id, "cancel")
        if (response.success) {
            Notify("success", response.message)
            // dispatch(updateFollowingList(userDetail._id))
            dispatch(removeFollowing(response.data))
            closeModal()
            // userList.map((user) => {
            //     if (user._id == userDetail._id) return user.isFollow = false
            // })
        } else {
            Notify("error", response.message)
        }
    }
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div>
                    <div className="model_container">
                        <button className="close_btn"><AiFillCloseCircle size={20} color="black" onClick={closeModal} /></button>
                        <div className="model_header">
                            <div className="profile">
                                <img src={userDetail?.profile} height="50" width="50" />
                            </div>
                            <p>{userDetail?.username}</p>
                        </div>
                        <hr />
                        <div className="model_body">
                            {/* <div className="model_item">
                                <p onClick={AddToCloseFriend}>Add to close friend list</p>
                                <AiTwotoneStar />
                            </div>
                            <div className="model_item">
                                <p onClick={AddToFavouriate}>Add to favouriate</p>
                                <AiTwotoneStar />
                            </div> */}
                            <div className="model_item">
                                <p onClick={AddToUnfollow}>unfollow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Model2;