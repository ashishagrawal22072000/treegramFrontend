import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
// import { dateOfBirthValidation } from "../../validator/Validation";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { TfiEmail } from "react-icons/tfi";
import { useSelector } from "react-redux";

import "./Confirm.css";
const Confirm = () => {
  const signupData = useSelector((state) => state.signup.signupData);

  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, ind) => (ind === index ? element.value : d))]);
    console.log(element);

    if (element.nextElementSibling) {
      element.nextElementSibling.focus();
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
              {signupData && signupData?.email}. <NavLink>Resend Code</NavLink>
            </p>
            <br />
            <form>
              <div className="form_container">
                {otp.map((ele, index) => {
                  return (
                    <>
                      <div className="field">
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
                      </div>
                    </>
                  );
                })}
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
