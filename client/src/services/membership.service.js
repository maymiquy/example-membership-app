import axios from "axios";
import { c } from "../utils/constant";

const BASE_URL = c.PUBLIC_BASE_URL;
const fetchMembership = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/pricing`);
        const { data } = response.data;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const postSubscription = async (priceId) => {
    try {
        const response = await axios.post(`${BASE_URL}/subscribe`, {
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
        const response = await axios.post(`${BASE_URL}/checkout/success`, {
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
        const response = await axios.get(`${BASE_URL}/limit/article?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const countUserVideoLimit = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/limit/video?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};



export { fetchMembership, postSubscription, postSuccessCheckout, countUserArticleLimit, countUserVideoLimit };