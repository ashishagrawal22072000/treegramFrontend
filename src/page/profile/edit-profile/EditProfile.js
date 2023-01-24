import { Field, Formik } from "formik";
import React, { useState } from "react"
import { ImCross } from "react-icons/im";
import { TbEyeglass, TbEyeglassOff } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { Form, useNavigate, useParams } from "react-router-dom";
import ButtonLoader from "../../../core/button-loader/ButtonLoader";
import Notify from "../../../core/Toast";
import "./EditProfile.css"
import { useDispatch } from "react-redux";
const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const param = useParams()
    const [loading, setLoading] = useState(false)
    return (
        <>
            <div className="container">
                <div className="edit_profile">
                    <div className="user">
                        <img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" height={150} width={150} />
                        <p>Change Profile</p>
                    </div>
                    {/* <Formik
                        initialValues={{
                            name: "",
                            password: "",
                        }}
                    // validationSchema={loginValidation}
                    onSubmit={async (values) => {
                            setLoading(true);
                            const response = await Authapi.login(
                                values.name,
                                values.password
                            );
                            console.log(response);
                            if (response.success) {
                                setLoading(false);
                                Notify("success", response.message);
                                localStorage.setItem("auth-token", response.data.token);
                                localStorage.setItem("profile", response.data.user.profile);
                                localStorage.setItem("user", response.data.user.username);
                                dispatch(
                                    authActions.auth({
                                        username: response.data.user.username,
                                        email: response.data.user.email,
                                        profile: response.data.user.profile,
                                        token: response.data.token,
                                    })
                                );
                                navigate("/add-user");
                            } else if (response.status == 500) {
                                setLoading(false);
                                Notify("warning", response.statusText);
                            } else {
                                setLoading(false);
                                Notify("error", response.message);
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
                                        // type={show ? "text" : "password"}
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
                                <div className="field">
                                    <Field
                                        name="name"
                                        className="input-field"
                                        placeholder="Name"
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
                            </Form>
                        )}
                    </Formik> */}
                    <form>
                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Name"
                            />
                            <p>Help people discover your account by using the name that you're known by:either your full name, nickname or business name</p>
                        </div>

                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Username"
                            />
                            <p>In most cases, you'll able to change your username back to {param.username}.</p>
                        </div>

                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Website"
                            />
                            <p>Edit your profile to change the websites to your bio.</p>
                        </div>
                        <div className="field">
                            <textarea
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Bio"
                            ></textarea>
                            <p>0/150</p>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Gender"
                            />
                        </div>
                        <div className="btn_container">
                            <button type="submit">
                                {loading ? <ButtonLoader /> : "Submit"}
                                <div class="arrow-wrapper">
                                    <div class="arrow"></div>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}
export default EditProfile