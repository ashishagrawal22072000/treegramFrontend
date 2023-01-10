import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "../page/ForgetPassword/ForgetPassword";
import Login from "../page/login/Login";
import Signup from "../page/signup/Signup";
import RouteName from "./RouteName";
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path={RouteName.SIGNUP} element={<Signup />} />
        <Route path={RouteName.LOGIN} element={<Login />} />
        <Route path={RouteName.FORGET_PASSWORD} element={<ForgetPassword />} />
      </Routes>
    </div>
  );
};

export default Router;
