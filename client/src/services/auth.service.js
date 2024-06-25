import axios from "axios";

const storeToken = async (token) => {
    try {
        return axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    } catch (error) {
        throw new Error(error.message);
    }
};

const regularLogin = async (email, password) => {
    try {
        const data = await axios.post("http://localhost:5000/api/login", {
            email,
            password,
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const oauthFacebook = async (accessToken) => {
    try {
        const data = await axios.post("http://localhost:5000/api/oauth/fb", {
            accessToken,
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { storeToken, regularLogin, oauthFacebook, };