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

const postSuccessCheckout = async (sessionId) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/checkout/success?session_id=${sessionId}`,
        );
        const { data } = response.data;
        console.log("success checkout service :", data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserArticleLimit = async (email) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/limit/article?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserVideoLimit = async (email) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/limit/video?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};



export { fetchMembership, postSubscription, postSuccessCheckout, countUserArticleLimit, countUserVideoLimit };