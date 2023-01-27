import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRouter = ({ children, ...rest }) => {
  // const authData = JSON.parse(localStorage.getItem("persist:root"))
  // console.log(authData?.authSlice?.auth?.token)
  // const auth_token = localStorage.getItem('auth-token');
  // const user = JSON.parse(localStorage.getItem('user'));
  const { auth } = useSelector(state => state.AuthReducer)
  return auth && auth.token ? <Outlet /> : <Navigate to="/" />
};
export default PrivateRouter;
