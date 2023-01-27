import Axios from "axios";

// import { Api } from "./apiCall"

class AuthApi {
  async checkusername(username) {
    const data = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/check-username`, { username })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return data;
  }
  async signup(data) {
    console.log(data);
    const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/signup`, {
      ...data,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
  async verifyEmail(email, otp) {
    const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/verify-email`, {
      email,
      otp,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
  async login(name, password) {
    const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/login`, {
      name,
      password,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
  async forgetPassword(name) {
    const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/forget-password`, {
      name,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  }
  async resetPassword(token, password, confirmPassword) {
    const response = await Axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  }
  async resendOtp(email) {
    const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/resend-otp`, {
      email,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  }
}

// export default new AuthApi();


// class AuthApi {
//   checkusername(username) {
//     return new Promise((resolve, reject) => {
//       (async () => {
//         try {
//           const res = await Api(
//             "post",
//             "api/v1/auth/check-username",
//             null,
//             { username }
//           )
//           console.log(res, "fvfvf")
//           // if (res.data.success === true) {
//           //   resolve(res.data)
//           // }
//           // if (res.data.success === false) {
//           //   resolve(res.data)
//           // }

//         } catch (err) {
//           // console.log(err)
//           reject(err)
//         }
//       })
//     })
//   }

//   signup(data) {
//     return new Promise((resolve, reject) => {
//       (async () => {
//         try {
//           const res = await Api(
//             "post",
//             "api/v1/auth/signup",
//             null,
//             { data }
//           )
//           console.log(res, "fvfvf")
//           // if (res.data.success === true) {
//           //   resolve(res.data)
//           // }
//           // if (res.data.success === false) {
//           //   resolve(res.data)
//           // }

//         } catch (err) {
//           // console.log(err)
//           reject(err)
//         }
//       })
//     })
//   }
// }
export default new AuthApi();
