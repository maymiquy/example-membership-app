import axios from "axios";
import cookies from "../utils/cookies";

const storeToken = async (token) => {
    try {
        return axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    } catch (error) {
        throw new Error(error.message);
    }
};

const regularLogin = async (email, password) => {
    const res = await axios.post("https://example-membership.vercel.app/api/login", {
        email,
        password,
    });

    const { token, message } = res.data;
    cookies.set('authcookie', token, { expires: 1 / 24, path: '/' })

    return message;
}

const regularRegister = async (name, email, password) => {
    const data = await axios.post("https://example-membership.vercel.app/api/register", {
        name,
        email,
        password,
    })

    return data;
}

const oauthFacebook = async (accessToken) => {
    try {
        const res = await axios.post("https://example-membership.vercel.app/api/oauth/fb", {
            accessToken,
        });

        const { token, message } = res.data;
        cookies.set('authcookie', token, { expires: 1 / 24, path: '/' })

        return message;
    } catch (error) {
        throw new Error(error.message);
    }
}

const oauthGoogle = async (accessToken) => {
    try {
        const res = await axios.post("https://example-membership.vercel.app/api/oauth/google", {
            accessToken,
        });
        const { token, message } = res.data;
        cookies.set('authcookie', token, { expires: 1 / 24, path: '/' })

        return message;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

const logout = async () => {
    try {
        const res = await axios.delete("https://example-membership.vercel.app/api/logout");
        cookies.remove('authcookie');
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { storeToken, regularLogin, regularRegister, oauthFacebook, oauthGoogle, logout };