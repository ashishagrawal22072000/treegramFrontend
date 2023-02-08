import React, { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { AiTwotoneStar, AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import Notify from "../../core/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFollowing,
    updateFollowingList,
    updateUserList,
} from "../../store/list/ListAction";
import feedApi from "../../api/feedApi";
import CloseIcon from "../../assets/images/img/cross_circle.svg";
import DeleteIcon from "../../assets/images/img/delete.svg";
import { HiBadgeCheck } from "react-icons/hi";
const CommentModel = ({ modalIsOpen, setIsOpen, post_id }) => {
    const { auth } = useSelector((state) => state.AuthReducer);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function fetchComments() {
            const getComments = await feedApi.getCommentList(auth?.token, post_id);
            console.log(getComments, post_id)
            if (getComments.success) {
                console.log(getComments.data.comments, "comments");
                setComments(getComments.data.comments)
            }
        }
        fetchComments();
    }, []);
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "500px",
            width: "500px",
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
    // const AddToUnfollow = async () => {
    //     const response = await UserApi.followUser(auth?.token, userDetail._id, "cancel")
    //     if (response.success) {
    //         Notify("success", response.message)
    //         // dispatch(updateFollowingList(userDetail._id))
    //         dispatch(removeFollowing(response.data))
    //         closeModal()
    //         // userList.map((user) => {
    //         //     if (user._id == userDetail._id) return user.isFollow = false
    //         // })
    //     } else {
    //         Notify("error", response.message)
    //     }
    // }
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
                        <button className="close_btn">
                            <img
                                src={CloseIcon}
                                height="30px"
                                width="30px"
                                onClick={closeModal}
                            />
                        </button>
                        {comments.map((ele) => {
                            return (
                                <>
                                    <div className="comment_container">
                                        <div className="user_container">
                                            <img src={ele?.profile} width="50px" height="50px" />
                                            <div className="user_content">
                                                <h3>{ele?.username}{ele?.user?.badge ? (
                                                    <span className="badge">
                                                        <HiBadgeCheck size="20" />
                                                    </span>
                                                ) : (
                                                    ""
                                                )}</h3>
                                                <p>{ele?.comment}</p>
                                            </div>
                                        </div>

                                        <div className="delete_icon">
                                            <img src={DeleteIcon} />
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        {/* <div className="model_header">
                            <div className="profile">
                                <img src={userDetail?.profile} height="50" width="50" />
                            </div>
                            <p>{userDetail?.username}</p>
                        </div> */}
                        <hr />
                        {/* <div className="model_body">
                            <div className="model_item">
                                <p onClick={AddToUnfollow}>unfollow</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default CommentModel;
