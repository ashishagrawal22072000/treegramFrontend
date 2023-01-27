import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
// import { dateOfBirthValidation } from "../../validator/Validation";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { TfiEmail } from "react-icons/tfi";
import { useSelector } from "react-redux";

import "./Confirm.css";
import Authapi from "../../api/Authapi";
import Notify from "../../core/Toast";
import ButtonLoader from "../../core/button-loader/ButtonLoader";
const Confirm = () => {
  const { signup } = useSelector((state) => state.AuthReducer);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  console.log(otp);
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, ind) => (ind === index ? element.value : d))]);

    if (element.nextElementSibling) {
      element.nextElementSibling.focus();
    }
  };

  useEffect(() => {
    if (!Object.keys(signup).length) navigate("/")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("handleSubmit", otp.join(""));
    const response = await Authapi.verifyEmail(signup?.email, otp.join(""));
    if (response.success) {
      setLoading(false);
      Notify("success", response.message);
      navigate("/account-privacy");
    } else {
      setLoading(false);
      Notify("error", response.message);
    }
  };

  const ResendOtp = async () => {
    const response = await Authapi.resendOtp(signup?.email);
    if (response.status == 200) {
      Notify("success", response.data.message);
    } else if (response.status == 500) {
      Notify("warning", response.statusText);
    } else {
      Notify("error", response.data.message);
    }
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="content">
            <div className="icon_container">
              <TfiEmail className="icons" size={100} />
            </div>
            <p>Enter Confirmation Code</p>
            <br />
            <p>
              Enter the confirmation code we sent to{" "}
              {signup && signup?.email}.{" "}
              <NavLink onClick={ResendOtp}>Resend Code</NavLink>
            </p>
            <br />
            <form>
              <div className="form_container">
                {otp.map((ele, index) => {
                  return (
                    <>
                      <input
                        type="text"
                        className="confirm_input"
                        onChange={(e) => handleChange(e.target, index)}
                        maxLength="1"
                        name="otp"
                        key={index}
                        value={ele}
                        onSelect={(e) => e.target.select()}
                      />
                    </>
                  );
                })}
              </div>
              <div className="btn_container">
                <button type="submit" onClick={handleSubmit}>
                  {loading ? <ButtonLoader /> : "Send"}
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                </button>
              </div>
            </form>
            <br />
            <div className="divider">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div>
            <br />
            <div className="btn_container">
              <button>
                <div class="arrow-wrapper">
                  <div class="arrow"></div>
                </div>
                <NavLink to="/login" style={{ color: "white" }}>
                  Back to login
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Confirm;
