import { FOLLOWER_LIST, FOLLOWING_LIST, USER_LIST, UPDATE_USER_LIST, UPDATE_FOLLOWER_LIST, UPDATE_FOLLOWING_LIST } from "../Type"

const initialState = {
    follower: [],
    following: [],
    user: []
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case FOLLOWER_LIST:
            console.log(payload)
            return {
                ...state, follower: payload
            }
        case FOLLOWING_LIST:
            console.log(payload, "fbffbfggfgfgfgf")
            return {
                ...state,
                following: payload,
            }
        case USER_LIST:
            console.log(payload, "fbffbfggfgfgfgf")
            return {
                ...state,
                user: payload,
            }
        case UPDATE_USER_LIST:
            const updateUser = state.user.filter((ele) => {
                if (ele._id == payload.id) ele.isFollow = payload.data;
                return ele
            })
            console.log(updateUser, "fhfhhfuehfgfhrh")
            return {
                ...state,
                user: updateUser
            }
        case UPDATE_FOLLOWING_LIST:
            const updateFollowing = state.following.filter((ele) => {
                return ele.follow_to._id != payload.id
            })
            console.log(updateFollowing, payload)
            return {
                ...state,
                following: updateFollowing
            }
        case UPDATE_FOLLOWER_LIST:
            const updateFollower = state.follower.filter((ele) => {
                return ele.follow_from._id != payload.id
            })
            return {
                ...state,
                follower: updateFollower
            }
        default:
            return state
    }
}