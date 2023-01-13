import * as yup from "yup";

export const signUpValidation = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username contains atleast 5 charactors")
    .max(20, "Username contains atmost 20 charactors")
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
      "Username Only contains alphanumeric characters, _ or ."
    )
    .required("username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .min(10, "Phone should atleast 10 charactors long")
    .matches(/^[6-9]{1}[0-9]{9}$/, "Invalid Phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password contains atleast 5 charactors")
    .max(20, "Password contains atmost 20 charactors")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
      "Minimum eight characters, at least one letter and one number"
    )
    .required("password is required"),
});

export const loginValidation = yup.object().shape({
  name: yup.string().required("Please Enter userName, Phone or Email"),
  password: yup
    .string()
    .min(5, "Password contains atleast 5 charactors")
    .max(20, "Password contains atmost 20 charactors")
    .required("password is required"),
});

export const ForgetPasswordValidation = yup.object().shape({
  name: yup.string().required("Please Enter userName, Phone or Email"),
});

export const dateOfBirthValidation = yup.object().shape({
  month: yup.string().required("Required"),
  day: yup.number().required("Required"),
  year: yup.number().required("Required"),
});

export const resetPassword = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password contains atleast 5 charactors")
    .max(20, "Password contains atmost 20 charactors")
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
      "Minimum eight characters, at least one letter and one number"
    )
    .required("password is required"),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .when("password", (password, schema) => {
      if (password) return schema.required("Confirm Password is required");
    })
    .oneOf([yup.ref("password")], "Confirm Password must match to Password"),
});
