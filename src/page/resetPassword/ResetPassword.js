import React, { useState } from "react";
import { resetPassword } from "../../validator/Validation";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import { TbEyeglass, TbEyeglassOff } from "react-icons/tb";

const ResetPassword = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="content">
            <h1 className="heading">Treegram</h1>
            <br />
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={resetPassword}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="form">
                  <div className="field">
                    <Field
                      name="password"
                      type={show ? "text" : "password"}
                      className="input-field"
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <div className="error_sign">
                        <ImCross color="red" />
                      </div>
                    ) : (
                      <div className="error_sign">
                        <TiTick
                          color="green"
                          size={30}
                          style={{
                            display:
                              values.password.length > 1 ? "block" : "none",
                          }}
                        />
                      </div>
                    )}
                    {show ? (
                      <div className="error_sign eye_sign">
                        <TbEyeglass size={25} onClick={() => setShow(false)} />
                      </div>
                    ) : (
                      <div className="error_sign  eye_sign">
                        <TbEyeglassOff
                          size={25}
                          onClick={() => setShow(true)}
                        />
                      </div>
                    )}
                  </div>
                  {errors.password && touched.password ? (
                    <span className="error">{errors.password}</span>
                  ) : null}
                  <br />
                  <div className="field">
                    <Field
                      name="confirmPassword"
                      type={show ? "text" : "password"}
                      className="input-field"
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="error_sign">
                        <ImCross color="red" />
                      </div>
                    ) : (
                      <div className="error_sign">
                        <TiTick
                          color="green"
                          size={30}
                          style={{
                            display:
                              values.confirmPassword.length > 1
                                ? "block"
                                : "none",
                          }}
                        />
                      </div>
                    )}
                    {show ? (
                      <div className="error_sign eye_sign">
                        <TbEyeglass size={25} onClick={() => setShow(false)} />
                      </div>
                    ) : (
                      <div className="error_sign  eye_sign">
                        <TbEyeglassOff
                          size={25}
                          onClick={() => setShow(true)}
                        />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <span className="error">{errors.confirmPassword}</span>
                  ) : null}
                  <br />
                  <div className="btn_container">
                    <button type="submit">
                      Login
                      <div class="arrow-wrapper">
                        <div class="arrow"></div>
                      </div>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <br />
            <div className="divider">
              {/* <div className="line"></div> */}
              <div className="line"></div>
              <p>OR</p>
              {/* <div className="line"></div> */}
              <div className="line"></div>
            </div>
            <br />
            <p>
              <NavLink to="/forget-password">Forget Password?</NavLink>
            </p>
            <br />
            <p>
              Don't have an account? <NavLink to="/signup">Signup</NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
