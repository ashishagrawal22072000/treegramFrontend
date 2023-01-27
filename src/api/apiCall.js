import axios from 'axios';

export const Api = async (method, url, params = {}, data = {}, token) => {
    const result = await axios({
        method,
        url: process.env.REACT_APP_BASE_URL + url,
        params,
        data: { ...data },
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en",
            authorization: token ? `Bearer ${token}` : "",
        },
        responseType: "json",
    })
    return result;
}