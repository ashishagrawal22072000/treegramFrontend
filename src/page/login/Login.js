import React from "react";
import { Formik, Form, Field } from "formik";
import { loginValidation } from "../../validator/Validation";
import "./Login.css";
import { NavLink } from "react-router-dom";
import Footer from "../../core/footer/Footer";
const Login = () => {
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
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="form">
                  <div className="field">
                    <Field
                      name="name"
                      className="input-field"
                      placeholder="Username, email, phone"
                    />
                    {errors.name && touched.name ? (
                      <span className="error">{errors.name}</span>
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
                      <span className="error">{errors.password}</span>
                    ) : null}
                  </div>
                  <br />
                  <div className="btn_container">
                    <button className="normal_btn" type="submit">
                      Log in
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <br />
            <div className="divider">
              {/* <div className="line"></div> */}
              <hr className="line" />
              <p>OR</p>
              {/* <div className="line"></div> */}
              <hr className="line" />
            </div>
            <br />
            <button className="social_btn">login with facebook</button>
            <br />
            <p>
              <NavLink to="/forget_password">Forget Password?</NavLink>
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
