// src/utils/http.js
import axios from "axios";


const http = axios.create({

    timeout: 10000,

    headers: {

        "Content-Type": "application/json",

    },

});

const handleError = (method, error) => {

    console.error(`${method} Error:`, {

        message: error.message,

        status: error.response?.status,

        data: error.response?.data,

        });

    throw error;

};

export const httpUtils = {

    async get(url, config = {}) {

        try {

            const { data } = await http.get(url, config);

            return data;

        } catch (error) {

            handleError("GET", error);

        }

    },

    async post(url, body = {}, config = {}) {

        try {

            const { data } = await http.post(url, body, config);

            return data;

        } catch (error) {

            handleError("POST", error);

        }

    },


    async put(url, body = {}, config = {}) {

        try {

            const { data } = await http.put(url, body, config);

            return data;

        } catch (error) {

            handleError("PUT", error);

        }

    },

    async patch(url, body = {}, config = {}) {

        try {

            const { data } = await http.patch(url, body, config);

            return data;

        } catch (error) {

            handleError("PATCH", error);

        }

    },

    async delete(url, config = {}) {

        try {

            const { data } = await http.delete(url, config);

            return data;

        } catch (error) {

            handleError("DELETE", error);

        }

    },

};

export { http };

export default httpUtils;