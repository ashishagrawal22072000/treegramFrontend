import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRouter = ({ children }) => {
  const { auth } = useSelector((state) => state.authSlice);
  return auth.token ? children : Navigate("/login", { replace: true });
};
export default PrivateRouter;
