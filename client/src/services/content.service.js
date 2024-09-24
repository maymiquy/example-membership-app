
import api from "../config/api";

const fetchContents = async () => {
    try {
        const response = await api.get(`/contents`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleArticle = async (id) => {
    try {
        const response = await api.get(`/contents/article/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleVideo = async (id) => {
    try {
        const response = await api.get(`/contents/video/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { fetchContents, fetchSingleArticle, fetchSingleVideo };