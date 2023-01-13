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
}

export default new AuthApi();
