import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRouter = ({ children, ...rest }) => {
  const { auth } = useSelector((state) => state.authSlice);
  return auth.token ? <Outlet /> : <Navigate to="/" />
};
export default PrivateRouter;
