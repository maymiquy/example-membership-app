import axios from "axios";

const fetchMembership = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/api/pricing");
        const { data } = response.data;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const postSubscription = async (priceId) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/api/subscribe", {
            priceId,
        });
        const { data } = response.data;
        console.log("success subs service :", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { fetchMembership, postSubscription };