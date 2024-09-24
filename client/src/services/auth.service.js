import api from "../config/api";
import cookies from "../utils/cookies";

const regularLogin = async (email, password) => {
    const res = await api.post(`/login`, {
        email,
        password,
    });

    const { token, message } = res.data;
    cookies.set('AUTH-TOKEN', token, { expires: 1 / 24, path: '/' })

    return message;
}

const regularRegister = async (name, email, password) => {
    const data = await api.post(`/register`, {
        name,
        email,
        password,
    })

    return data;
}

const oauthFacebook = async (accessToken) => {
    try {
        const res = await api.post(`/oauth/fb`, {
            accessToken,
        });

        const { token, message } = res.data;
        cookies.set('AUTH-TOKEN', token, { expires: 1 / 24, path: '/' })

        return message;
    } catch (error) {
        throw new Error(error.message);
    }
}

const oauthGoogle = async (accessToken) => {
    try {
        const res = await api.post(`/oauth/google`, {
            accessToken,
        });
        const { token, message } = res.data;
        cookies.set('AUTH-TOKEN', token, { expires: 1 / 24, path: '/' })

        return message;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

const logout = async () => {
    try {
        const res = await api.delete(`/logout`);
        cookies.remove('AUTH-TOKEN');
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { regularLogin, regularRegister, oauthFacebook, oauthGoogle, logout };