import axios from "axios";

const fetchContents = async () => {
    try {
        const videos = await axios.get("http://localhost:5000/api/contents");
        return videos;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleArticle = async (id) => {
    try {
        const article = await axios.get(`http://localhost:5000/api/contents/article/${id}`);
        return article;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleVideo = async (id) => {
    try {
        const video = await axios.get(`http://localhost:5000/api/contents/video/${id}`);
        return video;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { fetchContents, fetchSingleArticle, fetchSingleVideo };