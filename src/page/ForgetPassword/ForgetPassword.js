import React from "react";
import "./ForgetPassword.css";
import { Formik, Form, Field } from "formik";
import { ForgetPasswordValidation } from "../../validator/Validation";
import { NavLink } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { AiFillLock } from "react-icons/ai";
const ForgetPassword = () => {
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="content">
            <h1 className="heading">Treegram</h1>
            <div className="icon_container">
              <AiFillLock className="icons" size={100} />
            </div>
            <br />
            <p>
              Enter Your Email, Phone or Username and we'll send you a link to
              get back into your account
            </p>
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={ForgetPasswordValidation}
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
                  <br />
                  <div className="btn_container">
                    <button type="submit">
                      Set login link
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
      </section>
      <Footer />
    </>
  );
};
export default ForgetPassword;
