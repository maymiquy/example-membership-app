import axios from "axios";
import { c } from "../utils/constant";

const BASE_URL = c.PUBLIC_BASE_URL;

const fetchContents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/contents`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleArticle = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/contents/article/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const fetchSingleVideo = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/contents/video/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { fetchContents, fetchSingleArticle, fetchSingleVideo };