import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Formik, Form, Field } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { TbEyeglass, TbEyeglassOff } from "react-icons/tb";
import { changePassword } from '../../../validator/Validation';
import { useSelector } from 'react-redux';
import SideNavbar from '../../../core/sideNavbar/SideNavbar';
import InnerNavbar from '../../../core/innerNavbar/InnerNavbar';
const ChangePassword = () => {
    const { auth } = useSelector(state => state.AuthReducer)
    const [show, setShow] = useState(false)
    return (
        <>
            <SideNavbar />

            <div className="container">
                <section className="login">
                    <div className="content">
                        <h2 className="heading">Change Password</h2>
                        <br />
                        <Formik
                            initialValues={{
                                oldPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                            }}
                            validationSchema={changePassword}
                            onSubmit={async (values) => {
                                // const response = await Authapi.resetPassword(
                                //     param.token,
                                //     values.password,
                                //     values.confirmPassword
                                // );
                                // if (response.status == 200) {
                                //     Notify("success", response.data.message);
                                //     navigate("/login");
                                // } else if (response.status == 500) {
                                //     Notify("warning", response.statusText);
                                // } else {
                                //     Notify("error", response.data.message);
                                // }
                            }}
                        >
                            {({ errors, touched, values }) => (
                                <Form className="form">
                                    <div className="field">
                                        <Field
                                            name="oldPassword"
                                            type={show ? "text" : "password"}
                                            className="input-field"
                                            placeholder="Old Password"
                                        />
                                        {errors.oldPassword && touched.oldPassword ? (
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
                                                            values.oldPassword.length > 1 ? "block" : "none",
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
                                    {errors.oldPassword && touched.oldPassword ? (
                                        <span className="error">{errors.oldPassword}</span>
                                    ) : null}
                                    <br />
                                    <div className="field">
                                        <Field
                                            name="newPassword"
                                            type={show ? "text" : "password"}
                                            className="input-field"
                                            placeholder="New Password"
                                        />
                                        {errors.newPassword && touched.newPassword ? (
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
                                                            values.newPassword.length > 1
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
                                    {errors.newPassword && touched.newPassword ? (
                                        <span className="error">{errors.newPassword}</span>
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
                                            Send
                                            <div class="arrow-wrapper">
                                                <div class="arrow"></div>
                                            </div>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </section>
                <InnerNavbar />
            </div>
        </>
    )
}
export default ChangePassword