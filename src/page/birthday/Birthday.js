import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { dateOfBirthValidation } from "../../validator/Validation";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../core/footer/Footer";
import { FaBirthdayCake } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../core/dropdown/DropDown";
import Loader from "../../core/loader/Loader";
import "./Birthday.css";
import Notify from "../../core/Toast";
import Authapi from "../../api/Authapi";
import ButtonLoader from "../../core/button-loader/ButtonLoader";
import { authActions } from "../../store/slice/AuthSlice";
const Birthday = () => {
  const signupData = useSelector((state) => state.signupSlice.signupData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(signupData).length === 0)
      navigate("/signup", { replace: true });
  }, []);
  const navigate = useNavigate();
  const month = [
    "Janurary",
    "Februar",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [];
  for (let i = 1; i <= 30; i++) {
    days.push(i);
  }
  const year = [];
  for (let i = 2022; i >= 1990; i--) {
    year.push(i);
  }
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="content">
            <div className="icon_container">
              <FaBirthdayCake className="icons" size={100} />
            </div>
            <p>Add Your Birthday</p>
            <br />
            <p>This won't be a part of your public profile.</p>
            <br />
            <NavLink to="/">Why do i need to provide my birthday?</NavLink>
            <br />
            <Formik
              initialValues={{
                month: "",
                day: "",
                year: "",
              }}
              validationSchema={dateOfBirthValidation}
              onSubmit={async (values) => {
                setLoading(true);
                const data = {
                  ...signupData,
                  dateOfBirth: `${values.day}-${values.month}-${values.year}`,
                };
                console.log(data);
                const response = await Authapi.signup(data);
                if (response.success) {
                  setLoading(false);
                  Notify("success", response.data.message);
                  localStorage.setItem("auth-token", response.data.token);
                  dispatch(
                    authActions.auth({
                      username: response.data.user.username,
                      email: response.data.user.email,
                      profile: response.data.user.profile,
                      token: response.data.token,
                    })
                  );
                  navigate("/confirmation", { replace: true });
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
                    <div className="field_content">
                      <DropDown
                        data={month}
                        onChange={(e) => {
                          values.month = e.target.value;
                        }}
                        initialValue="Month"
                        initialName="month"
                        style={{
                          border:
                            errors.month && touched.month
                              ? "1px solid red !important"
                              : "1px solid red !important",
                        }}
                      />
                      <div>
                        {errors.month && touched.month ? (
                          <span className="error">{errors.month}</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="field_content">
                      <DropDown
                        data={days}
                        onChange={(e) => {
                          values.day = e.target.value;
                        }}
                        initialValue="Days"
                        initialName="day"
                        style={{
                          border: errors.day ? "1px solid red !important" : "",
                        }}
                      />
                      <div>
                        {errors.day && touched.day ? (
                          <span className="error">{errors.day}</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="field_content">
                      <DropDown
                        data={year}
                        onChange={(e) => {
                          values.year = e.target.value;
                        }}
                        initialName="year"
                        initialValue="Year"
                        style={{
                          border: errors.year ? "1px solid red !important" : "",
                        }}
                      />
                      <div>
                        {errors.year && touched.year ? (
                          <span className="error">{errors.year}</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="btn_container">
                    <button type="submit">
                      {loading ? <ButtonLoader /> : "Next"}
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

export default Birthday;
