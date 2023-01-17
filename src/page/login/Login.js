import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { loginValidation } from "../../validator/Validation";
import "./Login.css";
import { NavLink } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { AiFillFacebook } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { TbEyeglass, TbEyeglassOff } from "react-icons/tb";
import Authapi from "../../api/Authapi";
import Notify from "../../core/Toast";
import ButtonLoader from "../../core/button-loader/ButtonLoader";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="content">
            <h1 className="heading">Treegram</h1>
            <br />
            <Formik
              initialValues={{
                name: "",
                password: "",
              }}
              validationSchema={loginValidation}
              onSubmit={async (values) => {
                setLoading(true);
                const response = await Authapi.login(
                  values.name,
                  values.password
                );
                console.log(response);
                if (response.status == 200) {
                  setLoading(false);
                  Notify("success", response.data.message);
                } else if (response.status == 500) {
                  setLoading(false);
                  Notify("warning", response.statusText);
                } else {
                  setLoading(false);
                  Notify("error", response.data.message);
                }
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="form">
                  <div className="field">
                    <Field
                      name="name"
                      className="input-field"
                      placeholder="Username, email, phone"
                    />
                    {errors.name && touched.name ? (
                      <div className="error_sign">
                        <ImCross color="red" />
                      </div>
                    ) : (
                      <div className="error_sign">
                        <TiTick
                          color="green"
                          size={30}
                          style={{
                            display: values.name.length > 1 ? "block" : "none",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.name && touched.name ? (
                    <span className="error">{errors.name}</span>
                  ) : null}
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
                  <div className="btn_container">
                    <button type="submit">
                      {loading ? <ButtonLoader /> : "Login"}
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
            <button className="social_btn">
              <AiFillFacebook />
              login with facebook
            </button>
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
      <Footer />
    </>
  );
};

export default Login;
