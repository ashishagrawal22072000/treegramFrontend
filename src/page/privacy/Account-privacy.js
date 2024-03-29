import React, { useEffect, useRef, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import UserApi from "../../api/UserApi.js";
import ButtonLoader from "../../core/button-loader/ButtonLoader";
import Notify from "../../core/Toast";
import { deleteSignup } from "../../store/auth/AuthAction.js";
// import { authActions } from "../../store/slice/AuthSlice.js";
import "./Account-privacy.css";
const Account_Privacy = () => {
  const [privacy_id, setPrivacy_id] = useState(null);
  const { auth } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="content">
            <div className="icon_container">
              <AiFillLock className="icons" size={100} />
            </div>
            <br />
            <p>Account Privacy</p>
            <br />
            <p>
              Choose who can see what you share. You can change this anytime in
              Settings.
            </p>
            <br />
            <form className="form">
              <div className="field">
                <input
                  name="account_privacy"
                  type="radio"
                  value={1}
                  onChange={(e) => {
                    setPrivacy_id(e.target.value);
                  }}
                //   className="input-field"
                />
                <label for="account_privacy">Public</label>
              </div>
              <p>Anyone can see your photos and videos</p>
              <br />
              <div className="field">
                <input
                  name="account_privacy"
                  type="radio"
                  value={2}
                  onChange={(e) => {
                    setPrivacy_id(e.target.value);
                  }}
                //   className="input-field"
                />
                <label for="account_privacy">Private</label>
              </div>
              <p>Only accounts you approve can see your photos and videos</p>
              <br />
              <div className="btn_container">
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    const response = await UserApi.AccountPrivacy(
                      auth?.token,
                      privacy_id
                    );
                    console.log(response);
                    if (response.success) {
                      setLoading(false);
                      Notify("success", response.message);
                      dispatch(deleteSignup())
                      navigate("/", { replace: true });
                    } else {
                      setLoading(false);
                      Notify("error", response.message);
                    }
                  }}
                >
                  {loading ? <ButtonLoader /> : "Next"}
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                </button>
              </div>
            </form>

            <br />
            <div className="divider">
              {/* <div className="line"></div> */}
              <div className="line"></div>
              <p>OR</p>
              {/* <div className="line"></div> */}
              <div className="line"></div>
            </div>
            {/*  */}
            <p>
              <NavLink to="/signup">Create new account</NavLink>
            </p>
            <br />
            <div className="btn_container">
              <button type="submit">
                <div class="arrow-wrapper">
                  <div class="arrow"></div>
                </div>
                <NavLink to="/login">Back to login</NavLink>
              </button>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};
export default Account_Privacy;
