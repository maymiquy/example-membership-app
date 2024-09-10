import axios from "axios";

const fetchMe = async () => {
    try {
        const { data } = await axios.get("https://example-membership.vercel.app/api/me");
        const user = data.data;
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { fetchMe };