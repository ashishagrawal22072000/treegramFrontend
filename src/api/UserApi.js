import Axios from "axios";

class UserApi {
    async AccountPrivacy(token, privacy_id) {
        const data = await Axios.patch(`${process.env.REACT_APP_BASE_URL}api/v1/user/privacy`, {
            privacy_id
        }, {

            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }
    async getFollowerList(token, username) {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/user/follower-list?username=${username}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }
    async getFollowingList(token, username) {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/user/following-list?username=${username}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }
    async getUserList(token, limit, skip) {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/user/user-list?limit=${limit}&&skip=${skip}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }
    async followUser(token, follower_id, follow_status) {
        console.log(token, "follow token")
        const data = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/user/follow`,
            {
                follower_id,
                follow_status
            }, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },

        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }

    async getUserBySearch(token, username) {
        console.log(username, "search token")
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/user?search=${username}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }
    async getAuthUserdetail(token) {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/user/authuser`, {
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
    async AddCloseFriend(token, follower_id) {
        const data = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/user/close-friend`, {
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
    async AddFavouriate(token, follower_id) {
        const data = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/user/favouriate`, {
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

    async getUserProfileDetail(token, username) {
        console.log(token)
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/user/view-profile?username=${username}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token ? `Bearer ${token}` : "",
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }

    async DeleteFollower(token, id) {
        const data = await Axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/user/follower/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
        return data;
    }
}

export default new UserApi();
