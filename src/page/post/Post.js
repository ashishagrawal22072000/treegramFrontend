import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import feedApi from '../../api/feedApi';
import { addFollowing, getPostList, setPostList } from '../../store/list/ListAction';
import Dot from "../../assets/images/img/threeDot.svg"
import "./Post.css"
import { HiBadgeCheck } from 'react-icons/hi';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import fillHeart from "../../assets/images/img/fillHeart.svg"
import unfillHeart from "../../assets/images/img/unfillHeart.svg"
import CommentIcon from "../../assets/images/img/comment.svg";
import ShareIcon from "../../assets/images/img/share.svg";
import BookmarkIcon from "../../assets/images/img/save.svg"
import Notify from '../../core/Toast';
import UserApi from '../../api/UserApi';
const Post = () => {
    const { auth } = useSelector(state => state.AuthReducer)
    const { post, following } = useSelector(state => state.ListReducer)
    // const [posts, setposts] = useState([])
    console.log(following)
    console.log(post)

    const dispatch = useDispatch()
    const videoRef = useRef();
    const [BtnLoading, setBtnLoading] = useState(false)
    useEffect(() => {
        async function fetchPosts() {
            const res = await feedApi.getPostList(auth?.token, 10, 0)
            if (res.success) {
                dispatch(setPostList(res.data))
            }
        }
        fetchPosts()

    }, [])

    const handleFollow = async (follower_id, privacy_id) => {
        setBtnLoading(true);
        const response = await UserApi.followUser(auth?.token, follower_id, privacy_id == 1 ? "confirm" : "pending")
        if (response.success) {
            dispatch(addFollowing(response.data))
            setBtnLoading(false)
            // dispatch(updateUserList(following_id, true))
            Notify("success", response.message)
        } else {
            setBtnLoading(false)
            Notify("error", response.message)
        }
    }

    return (
        <>
            <div className="post_container">
                {post.map((ele) => {
                    return (
                        <>
                            <div className='post'>
                                <div className="post_header">
                                    <div class="user_content">
                                        <div class="user_profile">
                                            <NavLink to={`/profile/${ele?.user?.username}`}><img src={ele?.user?.profile} /></NavLink>
                                        </div>
                                        <div class="user_detail">
                                            <p className="paragraph">{ele?.user?.username}{ele?.user?.badge ? <span className="badge"><HiBadgeCheck size="20" /></span> : ""}</p>
                                            <p className="paragraph">{ele?.user?.name}</p>
                                        </div>
                                        {following?.some((el) => {
                                            console.log(el._id, ele?.user?._id)
                                            return el._id !== ele?.user?._id
                                        })}
                                        {following?.some((el) => el._id !== ele?.user?._id) ? <button className={{ display: ele?.user?.username == auth?.username ? "none" : "block btn" }} onClick={() => handleFollow(ele?.user?._id, ele?.user?.privacy_id)}>Follow</button> : ""}
                                    </div>
                                    <div className="dots">
                                        <img src={Dot} height="20" width="20" />
                                    </div>
                                </div>
                                <div className="post_media">
                                    <Carousel>
                                        {ele?.media.map((ele) => {
                                            return (
                                                <>
                                                    <div>
                                                        {ele.split(".")[1] == "jpg" ? <img src={ele} /> : <video controls onLoad={(e) => e.target.play()}><source src={ele} type="video/mp4" /></video>}
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </Carousel>

                                </div>
                                <div className="post_icons">
                                    <div className="post_icons1">
                                        <img src={unfillHeart} height="30" width="30" />
                                        <img src={CommentIcon} height="30" width="30" />
                                        <img src={ShareIcon} height="30" width="30" />
                                    </div>
                                    <div className="post_icons2">
                                        <img src={BookmarkIcon} height="30" width="30" />
                                    </div>
                                </div>
                            </div>

                            <br />
                        </>
                    )
                })}

            </div>
        </>
    )
}
export default Post;