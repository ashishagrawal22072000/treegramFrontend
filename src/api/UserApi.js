import Axios from "axios";

class UserApi {
    async AccountPrivacy(token, privacy_id) {
        const data = await Axios.patch("api/v1/user/privacy", {
            data: { privacy_id },
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
    async getFollowerList(token) {
        const data = await Axios.get("api/v1/user/follower-list", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
    async getFollowingList(token) {
        const data = await Axios.get("api/v1/user/following-list", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
    async getUserList(token, limit, skip) {
        const data = await Axios.get(`api/v1/user/user-list?limit=${limit}&&skip=${skip}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
    async followUser(token, follower_id) {
        console.log(token, "follow token")
        const data = await Axios.post("api/v1/user/follow",
            {
                follower_id
            }, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },

        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
}

export default new UserApi();
