import React from "react";
import { Routes, Route } from "react-router-dom";
import Birthday from "../page/birthday/Birthday";
import Confirm from "../page/Confirm/Confirm";
import Error404 from "../page/Error404/Error404";
import ForgetPassword from "../page/ForgetPassword/ForgetPassword";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Account_Privacy from "../page/privacy/Account-privacy";
import ResetPassword from "../page/resetPassword/ResetPassword";
import Signup from "../page/signup/Signup";
import PrivateRouter from "./PrivateRouter";
import RouteName from "./RouteName";
const Router = () => {
  return (
    <div>
      <Routes>
        <Route
          path={RouteName.ACCOUNT_PRIVACY}
          element={
            // <PrivateRouter>
            <Account_Privacy />
            // </PrivateRouter>
          }
        />
        <Route path={RouteName.HOME} element={<Home />} />
        <Route path={RouteName.SIGNUP} element={<Signup />} />
        <Route path={RouteName.LOGIN} element={<Login />} />
        <Route path={RouteName.FORGET_PASSWORD} element={<ForgetPassword />} />
        <Route path={RouteName.BIRTHDAY} element={<Birthday />} />
        <Route path={RouteName.COMFIRM} element={<Confirm />} />
        <Route path={RouteName.RESET_PASSWORD} element={<ResetPassword />} />
        <Route exact path={RouteName.ERROR_404} element={<Error404 />} />
        <Route path={RouteName.ACCOUNT_PRIVACY} element={<Account_Privacy />} />
      </Routes>
    </div>
  );
};

export default Router;
