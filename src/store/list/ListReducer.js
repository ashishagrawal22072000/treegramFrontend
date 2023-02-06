import { POST_LIST, REMOVE_SEARCH, ADD_SEARCH, REMOVE_FOLLOWER, ADD_FOLLOWING, FOLLOWER_LIST, FOLLOWING_LIST, USER_LIST, UPDATE_USER_LIST, UPDATE_FOLLOWER_LIST, UPDATE_FOLLOWING_LIST, REMOVE_FOLLOWING } from "../Type"

const initialState = {
    follower: [],
    following: [],
    user: [],
    search: [],
    post: []

}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case FOLLOWER_LIST:
            return {
                ...state, follower: payload
            }
        case FOLLOWING_LIST:
            return {
                ...state,
                following: payload,
            }
        case USER_LIST:
            return {
                ...state,
                user: payload,
            }
        case UPDATE_USER_LIST:
            const updateUser = state.user.filter((ele) => {
                if (ele._id == payload.id) ele.isFollow = payload.data;
                return ele
            })
            return {
                ...state,
                user: updateUser
            }
        case ADD_FOLLOWING:
            console.log(payload)
            const data = [...state.following, payload]
            return {
                ...state,
                following: data
            }

        case REMOVE_FOLLOWING:
            const removefollowing = state.following.filter((ele) => {
                if (ele._id != payload._id) return ele
            })
            return {
                ...state,
                following: removefollowing
            }

        case REMOVE_FOLLOWER:
            const removeFollower = state.follower.filter((ele) => {
                if (ele._id != payload) return ele
            })
            return {
                ...state,
                follower: removeFollower
            }

        case UPDATE_FOLLOWER_LIST:
            const updateFollower = state.follower.filter((ele) => {
                return ele._id != payload._id
            })
            return {
                ...state,
                follower: updateFollower
            }
        case ADD_SEARCH:
            const addSearch = [...state.search, payload];
            return {
                ...state,
                search: addSearch
            }
        case REMOVE_SEARCH:
            const removeSearch = state.search.filter((ele) => {
                if (ele._id != payload) return ele
            })
            return {
                ...state,
                search: removeSearch
            }

        case POST_LIST:
            console.log(payload, "LIST REDUCER")
            return {
                ...state,
                post: payload
            }
        default:
            return state
    }
}