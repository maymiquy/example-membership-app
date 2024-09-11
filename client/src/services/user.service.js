import axios from "axios";
import { c } from "../utils/constant";

const BASE_URL = c.PUBLIC_BASE_URL;

const fetchMe = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/me`);
        const user = data.data;
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { fetchMe };