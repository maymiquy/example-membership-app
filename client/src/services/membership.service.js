import axios from "axios";

const fetchMembership = async () => {
    try {
        const response = await axios.get("https://example-membership-api.vercel.app/api/pricing");
        const { data } = response.data;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const postSubscription = async (priceId) => {
    try {
        const response = await axios.post("https://example-membership-api.vercel.app/api/subscribe", {
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
            `https://example-membership-api.vercel.app/api/checkout/success?session_id=${sessionId}`,
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
        const response = await axios.get(`https://example-membership-api.vercel.app/api/limit/article?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserVideoLimit = async (email) => {
    try {
        const response = await axios.get(`https://example-membership-api.vercel.app/api/limit/video?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};



export { fetchMembership, postSubscription, postSuccessCheckout, countUserArticleLimit, countUserVideoLimit };