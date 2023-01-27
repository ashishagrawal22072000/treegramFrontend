import { DELETE_SIGNUP, SIGNUP_DATA, SIGNUP_SUCCESS, SIGNUP_FAILURE, SET_MESSAGE, CLEAR_MESSAGE, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Type"

const initialState = {
    signup: {},
    auth: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case SIGNUP_DATA:
            return {
                ...state, signup: payload
            }
        case SIGNUP_SUCCESS:
            console.log(payload, "success")
            return {
                ...state,
                auth: payload,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: payload,
            }
        case DELETE_SIGNUP:
            let signup = {}
            return {
                ...state,
                signup
            }

        default:
            return state
    }
}