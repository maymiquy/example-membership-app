import api from "../config/api";

const fetchMembership = async () => {
    try {
        const response = await api.get(`/pricing`);
        const { data } = response.data;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const postSubscription = async (priceId) => {
    try {
        const response = await api.post(`/subscribe`, {
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
        const response = await api.post(`/checkout/success`, {
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
        const response = await api.get(`/limit/article?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserVideoLimit = async (email) => {
    try {
        const response = await api.get(`/limit/video?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};



export { fetchMembership, postSubscription, postSuccessCheckout, countUserArticleLimit, countUserVideoLimit };