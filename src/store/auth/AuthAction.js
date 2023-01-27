import Authapi from "../../api/Authapi"
import { DELETE_SIGNUP, SIGNUP_DATA, SIGNUP_SUCCESS, SIGNUP_FAILURE, SET_MESSAGE, CLEAR_MESSAGE, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Type"


export const signup = (data) => (dispatch) => {
    return dispatch({
        type: SIGNUP_DATA,
        payload: { ...data }
    })
}

export const register = (data) => (dispatch) => {
    console.log('register', data)
    return dispatch({
        type: SIGNUP_SUCCESS,
        payload: { ...data }
    })
}
export const login = (data) => (dispatch) => {
    return dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...data }
    })
}
export const deleteSignup = () => (dispatch) => {
    return dispatch({
        type: DELETE_SIGNUP
    })
}

// export const register = (signUpData) => (dispatch) => {
//     return authApi.register(signUpData).then(
//         (data) => {
//             dispatch({
//                 type: REGISTER_SUCCESS,
//                 payload: { user: data }
//             });

//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: data.message,
//             });

//             return Promise.resolve();
//         },
//         (error) => {
//             console.log(error);
//             dispatch({
//                 type: REGISTER_FAIL,
//             });

//             return Promise.reject(error);
//         }
//     );
// };