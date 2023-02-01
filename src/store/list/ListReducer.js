import { REMOVE_SEARCH, ADD_SEARCH, REMOVE_FOLLOWER, ADD_FOLLOWING, FOLLOWER_LIST, FOLLOWING_LIST, USER_LIST, UPDATE_USER_LIST, UPDATE_FOLLOWER_LIST, UPDATE_FOLLOWING_LIST, REMOVE_FOLLOWING } from "../Type"

const initialState = {
    follower: [],
    following: [],
    user: [],
    search: [{
        "_id": "63bf83bea8d075ddca219d0a",
        "username": "ashish",
        "email": "ashish2@yopmail.com",
        "profile": "http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg",
        "badge": true
    }],
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
        default:
            return state
    }
}