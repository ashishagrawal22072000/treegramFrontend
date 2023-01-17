import React, { useState } from "react";
import "./ForgetPassword.css";
import { Formik, Form, Field } from "formik";
import { ForgetPasswordValidation } from "../../validator/Validation";
import { NavLink } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { AiFillLock } from "react-icons/ai";
import Authapi from "../../api/Authapi";
import Notify from "../../core/Toast";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import ButtonLoader from "../../core/button-loader/ButtonLoader";
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
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
              onSubmit={async (values) => {
                setLoading(true);
                const response = await Authapi.forgetPassword(values.name);
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
                  <br />
                  <div className="btn_container">
                    <button type="submit">
                      {loading ? <ButtonLoader /> : "Set login link"}
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
