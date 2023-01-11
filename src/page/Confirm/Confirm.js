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
  //   console.log(signupData);
  const [inp, setInp] = useState({
    inp1: "",
    inp2: "",
    inp3: "",
    inp4: "",
  });

  //   const textInput1 = useRef("");
  //   const textInput2 = useRef("");
  //   const textInput3 = useRef("");
  //   const textInput4 = useRef("");

  //   const handleKeyPress = (e, field) => {
  //     e.preventDefault();
  //     console.log(e, field.current.nextSibling);
  //     let next = field.current.nextSibling;
  //     field.current.nextSibling.focus();
  //   };

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
                          className=""
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
                {/* <div className="field">
                  <input
                    type="text"
                    className=""
                    // name={textInput1}
                    onChange={(e) => {
                      setInp({ ...inp, inp1: e.target.value });
                    }}
                    value={inp.inp1}
                    maxLength="1"
                    name="inp1"
                    // ref={textInput1}
                    // onKeyPress={(e) => handleKeyPress(e, textInput1)}
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    className=""
                    // name={textInput2}
                    onChange={(e) => {
                      setInp({ ...inp, inp2: e.target.value });
                      console.log(e);
                    }}
                    name="inp2"
                    value={inp.inp2}
                    maxLength="1"
                    // ref={textInput2}
                    // onKeyPress={(e) => handleKeyPress(e, textInput2)}
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    className=""
                    // name={textInput3}
                    onChange={(e) => {
                      setInp({ ...inp, inp3: e.target.value });
                    }}
                    value={inp.inp3}
                    maxLength="1"
                    name="inp3"
                    // ref={textInput3}
                    // onKeyPress={(e) => handleKeyPress(e, textInput3)}
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    className=""
                    // name={textInput4}
                    onChange={(e) => {
                      setInp({ ...inp, inp4: e.target.value });
                    }}
                    value={inp.inp4}
                    maxLength="1"
                    name="inp4"
                    // ref={textInput4}
                    // onKeyPress={(e) => handleKeyPress(e, textInput4)}
                  />
                </div> */}
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
