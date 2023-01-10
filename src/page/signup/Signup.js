import React from "react";
import { Formik, Form, Field } from "formik";
import { signUpValidation } from "../../validator/Validation";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import Footer from "../../core/footer/Footer";
const Signup = () => {
  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="content">
            <h1 className="heading">Treegram</h1>
            <p className="paragraph">
              Sign up to see photos and videos from your friends.
            </p>
            <button className="social_btn">login with facebook</button>
            <br />
            <div className="divider">
              <hr className="line" />
              <p>OR</p>
              <hr className="line" />
            </div>
            <Formik
              initialValues={{
                userName: "",
                email: "",
                phone: "",
                password: "",
              }}
              validationSchema={signUpValidation}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="form">
                  <div className="field">
                    <Field
                      name="userName"
                      className="input-field"
                      placeholder="Username"
                    />
                    {errors.userName && touched.userName ? (
                      <p className="error">{errors.userName}</p>
                    ) : null}
                  </div>
                  <div className="field">
                    <Field
                      name="phone"
                      className="input-field"
                      placeholder="Phone"
                    />
                    {errors.phone && touched.phone ? (
                      <p className="error">{errors.phone}</p>
                    ) : null}
                  </div>
                  <div className="field">
                    <Field
                      name="email"
                      type="email"
                      className="input-field"
                      placeholder="Email Address"
                    />
                    {errors.email && touched.email ? (
                      <p className="error">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="field">
                    <Field
                      name="password"
                      type="password"
                      className="input-field"
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <p className="error">{errors.password}</p>
                    ) : null}
                  </div>
                  <br />
                  <p>
                    People who use our service may have uploaded your contact
                    information to Treegram.{" "}
                    <NavLink to="/">Learn More</NavLink>
                  </p>
                  <p>
                    By signing up, you agree to our{" "}
                    <NavLink to="/">Terms</NavLink> ,{" "}
                    <NavLink to="/">Privacy Policy</NavLink> and{" "}
                    <NavLink to="/">Cookies Policy</NavLink> .
                  </p>
                  <div className="btn_container">
                    <button className="normal_btn" type="submit">
                      Sign up
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
    </>
  );
};

export default Signup;
