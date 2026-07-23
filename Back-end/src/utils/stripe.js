import Stripe from "stripe";
import config from "../config/config.js";
import orderModel from "../models/order.model.js";

const stripe = new Stripe(config.stripeSecretKey);

const handleStripeError = (error) => {

    console.error(
        "Stripe Error:",
        error.raw?.message || error.message
    );

    throw error;

};

export const createPaymentIntent = async ({
    amount,
    orderId,
    currency = "usd",
}) => {

    try {

        if (!amount || amount <= 0) {
            throw new Error("Invalid payment amount.");
        }

        if (!orderId) {
            throw new Error("Order ID is required.");
        }

        return await stripe.paymentIntents.create({

            amount: Math.round(amount * 100),

            currency,

            metadata: {
                orderId,
            },

            automatic_payment_methods: {
                enabled: true,
            },

        });

    } catch (error) {

        handleStripeError(error);

    }

};

export const retrievePaymentIntent = async (paymentIntentId) => {

    try {

        return await stripe.paymentIntents.retrieve(
            paymentIntentId
        );

    } catch (error) {

        handleStripeError(error);

    }

};

export const confirmPayment = async (
    paymentIntentId,
    paymentMethodId
) => {

    try {

        return await stripe.paymentIntents.confirm(

            paymentIntentId,

            {
                payment_method: paymentMethodId,
            }

        );

    } catch (error) {

        handleStripeError(error);

    }

};

export const cancelPayment = async (paymentIntentId) => {

    try {

        return await stripe.paymentIntents.cancel(
            paymentIntentId
        );

    } catch (error) {

        handleStripeError(error);

    }

};

export const refundPayment = async (
    paymentIntentId,
    amount = null
) => {

    try {

        const refundData = {

            payment_intent: paymentIntentId,

        };

        if (amount) {

            refundData.amount = Math.round(amount * 100);

        }

        return await stripe.refunds.create(refundData);

    } catch (error) {

        handleStripeError(error);

    }

};

export const handleWebhook = async (
    payload,
    signature
) => {

    try {

        const event = stripe.webhooks.constructEvent(

            payload,

            signature,

            config.stripeWebhookSecret

        );

        switch (event.type) {

            case "payment_intent.succeeded":

                await handleSuccessfulPayment(
                    event.data.object
                );

                break;

            case "payment_intent.payment_failed":

                await handleFailedPayment(
                    event.data.object
                );

                break;

        }

        return {

            received: true,

        };

    } catch (error) {

        console.error(
            "Stripe Webhook Error:",
            error.message
        );

        return {

            received: false,

            error: error.message,

        };

    }

};

const handleSuccessfulPayment = async (
    paymentIntent
) => {

    try {

        await orderModel.findByIdAndUpdate(

            paymentIntent.metadata.orderId,

            {

                status: "processing",

                paymentStatus: "paid",

                paymentIntentId: paymentIntent.id,

                paidAt: new Date(),

            }

        );

    } catch (error) {

        console.error(error);

    }

};

const handleFailedPayment = async (
    paymentIntent
) => {

    try {

        await orderModel.findByIdAndUpdate(

            paymentIntent.metadata.orderId,

            {

                paymentStatus: "failed",

            }

        );

    } catch (error) {

        console.error(error);

    }

};

export default {

    createPaymentIntent,

    retrievePaymentIntent,

    confirmPayment,

    cancelPayment,

    refundPayment,

    handleWebhook,

};

