import * as yup from "yup";

export const signUpValidation = yup.object().shape({
  userName: yup
    .string()
    .min(5, "Username contains atleast 5 charactors")
    .max(20, "Username contains atmost 20 charactors")
    .required("username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .min(10, "Phone should atleast 10 charactors long")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(5, "Password contains atleast 5 charactors")
    .max(20, "Password contains atmost 20 charactors")
    .required("password is required"),
});

export const loginValidation = yup.object().shape({
  name: yup.string().required("Field is required"),
  password: yup
    .string()
    .min(5, "Password contains atleast 5 charactors")
    .max(20, "Password contains atmost 20 charactors")
    .required("password is required"),
});
