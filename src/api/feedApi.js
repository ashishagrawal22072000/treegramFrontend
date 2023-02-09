import Axios from "axios";

class FeedApi {
    async getPostList(token, limit, skip) {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/feed/post-list?limit=${limit}&&skip=${skip}`, {

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
    async getCommentList(token, post_id) {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/feed/comment-list/${post_id}`, {
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
    async PostLike(token, post_id) {
        try {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/v1/feed/like/${post_id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token ? `Bearer ${token}` : "",
                },
            }).then((res) => res.json()).then((data) => data)
            return data
        } catch (err) {
            return err
        }
        // const data = await fetch(`${process.env.REACT_APP_BASE_URL}api/v1/feed/like/${post_id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "authorization": token ? `Bearer ${token}` : "",
        //     },
        // })
        //     .then((res) => {
        //         return res.data;
        //     })
        //     .catch((err) => {
        //         return err.response.data;
        //     });
        // return data;
    }

    async uploadFile(file) {
        const data = await Axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/upload-image`,
            file,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
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

export default new FeedApi();
