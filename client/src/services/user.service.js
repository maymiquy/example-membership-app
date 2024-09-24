import api from "../config/api";

const fetchMe = async () => {
    try {
        const { data } = await api.get(`/me`);
        const user = data.data;
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { fetchMe };