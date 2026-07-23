import axios from "axios";

const paypalBaseUrl =
    process.env.NODE_ENV === "production"
        ? "https://api.paypal.com"
        : "https://api.sandbox.paypal.com";

export const paypalClient = axios.create({
    baseURL: paypalBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleError = (error) => {
    console.error(
        "PayPal Error:",
        error.response?.data || error.message
    );

    throw error;
};

export const generatePayPalAccessToken = async () => {

    try {

        const { data } = await paypalClient.post(

            "/v1/oauth2/token",

            "grant_type=client_credentials",

            {
                headers: {

                    "Content-Type": "application/x-www-form-urlencoded",

                    Authorization: `Basic ${Buffer.from(
                        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
                    ).toString("base64")}`,

                },
            }

        );

        return data.access_token;

    } catch (error) {

        handleError(error);

    }

};

export const createOrder = async (orderData) => {

    try {

        const accessToken = await generatePayPalAccessToken();

        const { data } = await paypalClient.post(

            "/v2/checkout/orders",

            orderData,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }

        );

        return data;

    } catch (error) {

        handleError(error);

    }

};

export const captureOrder = async (orderId) => {

    try {

        const accessToken = await generatePayPalAccessToken();

        const { data } = await paypalClient.post(

            `/v2/checkout/orders/${orderId}/capture`,

            {},

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }

        );

        return data;

    } catch (error) {

        handleError(error);

    }

};

export const getOrder = async (orderId) => {

    try {

        const accessToken = await generatePayPalAccessToken();

        const { data } = await paypalClient.get(

            `/v2/checkout/orders/${orderId}`,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }

        );

        return data;

    } catch (error) {

        handleError(error);

    }

};

export const refundCapture = async (
    captureId,
    refundData = {}
) => {

    try {

        const accessToken = await generatePayPalAccessToken();

        const { data } = await paypalClient.post(

            `/v2/payments/captures/${captureId}/refund`,

            refundData,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }

        );

        return data;

    } catch (error) {

        handleError(error);

    }

};

export default paypalClient;

