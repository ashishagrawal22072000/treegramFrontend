import Authapi from "../../api/Authapi"
import { REMOVE_FOLLOWER, ADD_FOLLOWING, UPDATE_FOLLOWER_LIST, FOLLOWER_LIST, USER_LIST, FOLLOWING_LIST, UPDATE_USER_LIST, UPDATE_FOLLOWING_LIST, REMOVE_FOLLOWING } from "../Type"


export const setFollowerList = (data) => (dispatch) => {
    return dispatch({
        type: FOLLOWER_LIST,
        payload: data
    })
}

export const setFollowingList = (data) => (dispatch) => {
    console.log(data, "gfgfgfgfgfg")
    return dispatch({
        type: FOLLOWING_LIST,
        payload: data
    })
}

export const addFollowing = (data) => (dispatch) => {
    return dispatch({
        type: ADD_FOLLOWING,
        payload: data
    })
}

export const removeFollowing = (data) => (dispatch) => {
    return dispatch({ type: REMOVE_FOLLOWING, payload: data })
}

export const getUserList = (data) => (dispatch) => {
    return dispatch({
        type: USER_LIST,
        payload: data
    })
}
export const updateUserList = (id, data) => (dispatch) => {
    return dispatch({
        type: UPDATE_USER_LIST,
        payload: { id, data }
    })
}
export const updateFollowingList = (data) => (dispatch) => {
    return dispatch({
        type: UPDATE_FOLLOWING_LIST,
        payload: { ...data }
    })
}

export const updateFollowerList = (id) => (dispatch) => {
    return dispatch({
        type: UPDATE_FOLLOWER_LIST,
        payload: { id }
    })
}

export const removeFollower = (data) => (dispatch) => {
    return dispatch({ type: REMOVE_FOLLOWER, payload: data })
}