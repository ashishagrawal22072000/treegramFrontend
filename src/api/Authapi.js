import Axios from "axios";

class AuthApi {
  async checkusername(username) {
    const data = await Axios.post("api/v1/auth/check-username", { username })
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
    const response = await Axios.post("api/v1/auth/signup", {
      ...data,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  }
  async verifyEmail(email, otp) {
    const response = await Axios.post("api/v1/auth/verify-email", {
      email,
      otp,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  }
  async login(name, password) {
    const response = await Axios.post("api/v1/auth/login", {
      name,
      password,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  }
  async forgetPassword(name) {
    const response = await Axios.post("api/v1/auth/forget-password", {
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
    const response = await Axios.patch(`/api/v1/auth/reset-password/${token}`, {
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
}

export default new AuthApi();
