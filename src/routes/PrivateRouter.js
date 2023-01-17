import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRouter = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  console.log(token);
  return token ? children : Navigate("/login", { replace: true });
};
export default PrivateRouter;
