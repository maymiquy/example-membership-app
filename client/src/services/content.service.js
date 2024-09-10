import axios from "axios";

const fetchContents = async () => {
    try {
        const response = await axios.get("https://example-membership.vercel.app/api/contents");
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleArticle = async (id) => {
    try {
        const response = await axios.get(`https://example-membership.vercel.app/api/contents/article/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleVideo = async (id) => {
    try {
        const response = await axios.get(`https://example-membership.vercel.app/api/contents/video/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { fetchContents, fetchSingleArticle, fetchSingleVideo };