import React, { useEffect, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import feedApi from '../../api/feedApi';
import "./CommentContainer.css";
import DeleteIcon from "../../assets/images/img/delete.svg"
import Loader from '../loader/Loader';
const CommentContainer = ({ post_id }) => {
    const { auth } = useSelector((state) => state.AuthReducer);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchComments() {
            setLoading(true)
            const getComments = await feedApi.getCommentList(auth?.token, post_id);
            if (getComments.success) {
                setLoading(false)
                console.log(getComments.data.comments, "comments");
                setComments(getComments.data.comments)
            } else {
                setLoading(false)
            }
        }
        fetchComments();
    }, []);
    return (
        <>
            {loading ? <Loader /> : <>

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
                                        <div className="comment_buttons">
                                            <span>Like</span>
                                            <span>Reply({ele.comment_reply.length})</span>
                                        </div>
                                        {ele?.comment_reply && ele.comment_reply.map((ele) => {
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
                                                                <div className="comment_buttons">
                                                                    <span>Like</span>
                                                                    <span>Reply</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="delete_icon">
                                                            <img src={DeleteIcon} />
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="delete_icon">
                                    <img src={DeleteIcon} />
                                </div>
                            </div>
                        </>
                    )
                })}
            </>}
        </>
    )
}

export default CommentContainer