import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { signUpValidation } from "../../validator/Validation";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { AiFillFacebook } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
// import { signupActions } from "../.././store/slice/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import { TbEyeglass, TbEyeglassOff } from "react-icons/tb";
import Authapi from "../../api/Authapi";
import Notify from "../../core/Toast";
import Loader from "../../core/loader/Loader";
import ButtonLoader from "../../core/button-loader/ButtonLoader";
import { signup } from "../../store/auth/AuthAction";
const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="content">
            <h1 className="heading">Treegram</h1>
            <p className="paragraph">
              Sign up to see photos and videos from your friends.
            </p>
            <button className="social_btn">
              <AiFillFacebook /> login with facebook
            </button>
            <br />
            <div className="divider">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div>
            <Formik
              initialValues={{
                username: "",
                email: "",
                phone: "",
                password: "",
              }}
              validationSchema={signUpValidation}
              onSubmit={async (values) => {
                setLoading(true);
                const response = await Authapi.checkusername(values.username);
                console.log(response, "sdsdsdsdsdsddsds")
                if (response.status == 200) {
                  setLoading(false);
                  dispatch(signup(values))
                  // dispatch(signupActions.signup(values));
                  navigate("/set-birthday");
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
                      name="username"
                      className="input-field"
                      placeholder="Username"
                    />
                    {errors.username && touched.username ? (
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
                              values.username.length > 1 ? "block" : "none",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.username && touched.username ? (
                    <span className="error">{errors.username}</span>
                  ) : null}

                  <div className="field">
                    <Field
                      name="phone"
                      className="input-field"
                      placeholder="Phone"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="error_sign">
                        <ImCross color="red" />
                      </div>
                    ) : (
                      <div className="error_sign">
                        <TiTick
                          color="green"
                          size={30}
                          style={{
                            display: values.phone.length > 1 ? "block" : "none",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.phone && touched.phone ? (
                    <span className="error">{errors.phone}</span>
                  ) : null}

                  <div className="field">
                    <Field
                      name="email"
                      type="email"
                      className="input-field"
                      placeholder="Email Address"
                    />
                    {errors.email && touched.email ? (
                      <div className="error_sign">
                        <ImCross color="red" />
                      </div>
                    ) : (
                      <div className="error_sign">
                        <TiTick
                          color="green"
                          size={30}
                          style={{
                            display: values.email.length > 1 ? "block" : "none",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.email && touched.email ? (
                    <span className="error">{errors.email}</span>
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
                  <p className="paragraph">
                    People who use our service may have uploaded your contact
                    information to Treegram.{" "}
                    <NavLink to="/">Learn More</NavLink>
                  </p>
                  <ButtonLoader />
                  <p className="paragraph">
                    By signing up, you agree to our{" "}
                    <NavLink to="/">Terms</NavLink> ,{" "}
                    <NavLink to="/">Privacy Policy</NavLink> and{" "}
                    <NavLink to="/">Cookies Policy</NavLink> .
                  </p>
                  <div className="btn_container">
                    <button type="submit">
                      {loading ? <ButtonLoader /> : "Sign Up"}
                      <div class="arrow-wrapper">
                        <div class="arrow"></div>
                      </div>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <br />
            <p>
              Have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </div>
      </section>
      <Footer />
      {/* {next && (
        <>
          <Birthday />
        </>
      )} */}
    </>
  );
};

export default Signup;
