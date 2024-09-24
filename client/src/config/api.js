import axios from "axios";
import { c } from "../utils/constant";
import cookies from "../utils/cookies";

const BASE_URL = c.PUBLIC_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(config => {
    const token = cookies.get("AUTH-TOKEN");
    if (token) {
        config.headers["Authorization"] = `Baerer ${token}`
    }


    // if (config.method !== 'get') {
    //   const csrfToken = getCookie('XSRF-TOKEN');
    //   if (csrfToken) {
    //     config.headers['X-XSRF-TOKEN'] = csrfToken;
    //   }
    // }
    return config;
});

export default api;
