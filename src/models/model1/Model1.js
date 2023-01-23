import React, { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { AiTwotoneStar, AiFillCloseCircle } from "react-icons/ai"
import "./Model1.css"
import Modal from 'react-modal';
import Notify from "../../core/Toast";
const Model1 = ({ modalIsOpen, setIsOpen, username }) => {
    console.log(username, "modal");
    const [userDetail, setUserDetail] = useState({})
    const [close, setClose] = useState('block')
    const auth_token = localStorage.getItem('auth-token');
    useEffect(() => {
        console.log("dghdgdgdgdgdgd")
        async function fetchUser() {
            const response = await UserApi.getUserBySearch(auth_token, username);
            console.log(response, "modeldata")
            if (response.status == 200) {
                setUserDetail(...response.data.data)
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
            height: "400px",
            width: "400px"
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
    const AddToCloseFriend = async () => {
        const response = await UserApi.AddCloseFriend(auth_token, userDetail._id)
        if (response.status == 200) {
            Notify("success", response.data.message)
        } else {
            Notify("error", response.data.message)
        }
    }
    const AddToFavouriate = async () => {
        const response = await UserApi.AddFavouriate(auth_token, userDetail._id)
        if (response.status == 200) {
            Notify("success", response.data.message)
        } else {
            Notify("error", response.data.message)
        }
    }
    return (
        <>
            {/* <div className="model" style={{ "display": `${close}` }}>
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
            </div> */}
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
                                <img src={userDetail.profile} height="50" width="50" />
                            </div>
                            <p>{userDetail.username}</p>
                        </div>
                        <hr />
                        <div className="model_body">
                            <div className="model_item">
                                <p onClick={AddToCloseFriend}>Add to close friend list</p>
                                <AiTwotoneStar />
                            </div>
                            <div className="model_item">
                                <p onClick={AddToFavouriate}>Add to favouriate</p>
                                <AiTwotoneStar />
                            </div>
                            <div className="model_item">
                                <p>unfollow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Model1;