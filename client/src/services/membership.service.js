import axios from "axios";

const fetchMembership = async () => {
    try {
        const response = await axios.get("https://example-membership.vercel.app/api/pricing");
        const { data } = response.data;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const postSubscription = async (priceId) => {
    try {
        const response = await axios.post("https://example-membership.vercel.app/api/subscribe", {
            priceId,
        });
        const { data } = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const postSuccessCheckout = async (invoice_id) => {
    try {
        const response = await axios.post(`https://example-membership.vercel.app/api/checkout/success`, {
            invoice_id
        });
        const { data } = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserArticleLimit = async (email) => {
    try {
        const response = await axios.get(`https://example-membership.vercel.app/api/limit/article?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserVideoLimit = async (email) => {
    try {
        const response = await axios.get(`https://example-membership.vercel.app/api/limit/video?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};



export { fetchMembership, postSubscription, postSuccessCheckout, countUserArticleLimit, countUserVideoLimit };