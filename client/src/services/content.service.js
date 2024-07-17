import axios from "axios";

const fetchContents = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/contents");
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleArticle = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/contents/article/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleVideo = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/contents/video/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { fetchContents, fetchSingleArticle, fetchSingleVideo };