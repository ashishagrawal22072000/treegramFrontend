import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import feedApi from "../../api/feedApi";
import {
    addFollowing,
    getPostList,
    setPostList,
    likeAPost
} from "../../store/list/ListAction";
import Dot from "../../assets/images/img/threeDot.svg";
import "./Post.css";
import { HiBadgeCheck } from "react-icons/hi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import fillHeart from "../../assets/images/img/fillHeart.svg";
import unfillHeart from "../../assets/images/img/unfillHeart.svg";
import CommentIcon from "../../assets/images/img/comment.svg";
import ShareIcon from "../../assets/images/img/share.svg";
import BookmarkIcon from "../../assets/images/img/save.svg";

import PlayIcon from "../../assets/images/img/play.svg";
import PauseIcon from "../../assets/images/img/pause.svg";
import VolumeIcon from "../../assets/images/img/volume.svg";
import MuteIcon from "../../assets/images/img/mute.svg";
import Notify from "../../core/Toast";
import UserApi from "../../api/UserApi";
import CommentModel from "../../models/commentModel/CommentModel";
import CommentContainer from "../../core/commentContainer/CommentContainer";
const Post = () => {
    const { auth } = useSelector((state) => state.AuthReducer);
    const { post, following } = useSelector((state) => state.ListReducer);
    // const [posts, setposts] = useState([])
    console.log(following);
    console.log(following);
    const dispatch = useDispatch();
    const videoRef = useRef();
    const [BtnLoading, setBtnLoading] = useState(false);
    const [tooltip, setToolTip] = useState(false);
    const [showMore, setShowMore] = useState(-1);
    const [showComment, setShowComment] = useState(-1);
    useEffect(() => {
        async function fetchPosts() {
            const res = await feedApi.getPostList(auth?.token, 15, 0);
            if (res.success) {
                dispatch(setPostList(res.data));

            }
        }
        fetchPosts();
    }, []);

    const handleFollow = async (follower_id, privacy_id) => {
        setBtnLoading(true);
        const response = await UserApi.followUser(
            auth?.token,
            follower_id,
            privacy_id == 1 ? "confirm" : "pending"
        );
        if (response.success) {
            dispatch(addFollowing(response.data));
            setBtnLoading(false);
            // dispatch(updateUserList(following_id, true))
            Notify("success", response.message);
        } else {
            setBtnLoading(false);
            Notify("error", response.message);
        }
    };


    const [id, setId] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const likePost = async (post_id) => {
        const res = await feedApi.PostLike(auth?.token, post_id)
        console.log(res);
        if (res.success) {
            console.log(post_id)
            dispatch(likeAPost(post_id))
        }
    }


    return (
        <>
            <div className="post_container">
                {post.map((ele, i) => {
                    return (
                        <>
                            <div className="post">
                                <div className="post_header">
                                    <div class="user_content">
                                        <div class="user_profile">
                                            <NavLink to={`/profile/${ele?.user?.username}`}>
                                                <img src={ele?.user?.profile} />
                                            </NavLink>
                                        </div>
                                        <div class="user_detail">
                                            <p className="paragraph">
                                                {ele?.user?.username}
                                                {ele?.user?.badge ? (
                                                    <span className="badge">
                                                        <HiBadgeCheck size="20" />
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </p>
                                            <p className="paragraph">{ele?.user?.name}</p>
                                        </div>
                                        {console.log(
                                            following?.some((el) => el._id == ele?.user?._id)
                                                ? "none"
                                                : "button",
                                            "fhfhfhfhfhfhfhfhfhfhfhfhfh"
                                        )}
                                        {following?.some((el) => el._id == ele?.user?._id) ? (
                                            ""
                                        ) : (
                                            <button
                                                className="btn"
                                                style={{
                                                    display:
                                                        ele?.user?.username == auth?.username
                                                            ? "none"
                                                            : "block",
                                                }}
                                                onClick={() =>
                                                    handleFollow(ele?.user?._id, ele?.user?.privacy_id)
                                                }
                                            >
                                                Follow
                                            </button>
                                        )}
                                    </div>
                                    <div className="dots">
                                        <img src={Dot} height="20" width="20" />
                                    </div>
                                </div>
                                <div className="post_media">
                                    <Carousel>
                                        {ele?.media.map((media) => {
                                            return (
                                                <>
                                                    {media.split(".")[1] == "jpg" ||
                                                        media.split(".")[1] == "jpeg" ? (
                                                        <div
                                                            onMouseEnter={(e) => setToolTip(true)}
                                                            onMouseLeave={(e) => setToolTip(false)}
                                                        >
                                                            {tooltip &&
                                                                ele?.tags &&
                                                                ele?.tags.map((tagele) => {
                                                                    return tagele?.tags?.map((ele) => {
                                                                        return ele.media_url == media ? (
                                                                            <>
                                                                                {ele?.tagged_people.map((people) => {
                                                                                    return (
                                                                                        <>
                                                                                            <span className="small-tooltip">
                                                                                                <NavLink
                                                                                                    to={`/profile/${people?.username}`}
                                                                                                >
                                                                                                    {people.username}
                                                                                                </NavLink>
                                                                                            </span>
                                                                                        </>
                                                                                    );
                                                                                })}
                                                                            </>
                                                                        ) : (
                                                                            ""
                                                                        );
                                                                    });
                                                                })}
                                                            <img src={media} />
                                                        </div>
                                                    ) : (
                                                        <div className="video_controls">
                                                            <video
                                                                onClick={(e) =>
                                                                    e.target.paused
                                                                        ? e.target.play()
                                                                        : e.target.pause()
                                                                }
                                                            >
                                                                <source src={media} type="video/mp4" />
                                                            </video>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                                <div className="post_icons">
                                    <div className="post_icons1">
                                        <img onClick={() => likePost(ele?._id)} src={unfillHeart} height="30" width="30" />
                                        <img src={CommentIcon} height="30" width="30" />
                                        <img src={ShareIcon} height="30" width="30" />
                                    </div>
                                    <div className="post_icons2">
                                        <img src={BookmarkIcon} height="30" width="30" />
                                    </div>
                                </div>
                                {!ele.like_status ? (
                                    <>
                                        <h3>{ele?.like_count} likes</h3>
                                    </>
                                ) : (
                                    ""
                                )}
                                {ele.content.length > 100 ? (
                                    <>
                                        {showMore != -1 && showMore == i ? (
                                            <>
                                                <span className="content">
                                                    {ele.content}
                                                    <strong onClick={() => { setShowMore(-1); console.log(showMore) }}>
                                                        hide more
                                                    </strong>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="content">
                                                    {ele?.content.slice(0, 100)}{" "}
                                                    <strong onClick={() => { console.log(showMore); setShowMore(i) }}>
                                                        read more
                                                    </strong>
                                                </span>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <span>{ele.content}</span>
                                )}

                                {!ele.comment_status && ele.comment_count > 0 && <strong onClick={() => {
                                    showComment == -1 ? setShowComment(i) : setShowComment(-1)
                                }}>View All {ele.comment_count} comments</strong>}
                                {showComment !== -1 && showComment == i ? <>
                                    <CommentContainer post_id={ele?._id} />
                                    <div>
                                        <div className="user_comment">
                                            <img src={auth?.profile} height="50px" width="50px" />
                                            <form>
                                                <input type="text" placeholder="Share Your Thought" />
                                            </form>
                                        </div>
                                    </div>
                                </> : ""
                                }
                            </div>

                            <br />
                        </>
                    );
                })}
            </div>

            <CommentModel modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} post_id={id} />

        </>
    );
};
export default Post;
