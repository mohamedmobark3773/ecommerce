import webpush from "web-push";
import subscriptionModel from "../models/subscription.js";

export const sendNotification = async (
    userId,
    title,
    body,
    options = {}
) => {

    try {

        const subscriptions = await subscriptionModel
            .find({ user: userId })
            .select("endpoint p256dh auth -_id")
            .lean();

        if (!subscriptions.length) {
            return;
        }

        const results = await Promise.allSettled(

            subscriptions.map(async (subscription) => {

                try {

                    await webpush.sendNotification(

                        {
                            endpoint: subscription.endpoint,
                            keys: {
                                p256dh: subscription.p256dh,
                                auth: subscription.auth,
                            },
                        },

                        JSON.stringify({
                            title,
                            body,
                            ...options,
                        })

                    );

                } catch (error) {

                    if (
                        error.statusCode === 404 ||
                        error.statusCode === 410
                    ) {

                        await subscriptionModel.deleteOne({
                            endpoint: subscription.endpoint,
                        });

                    }

                    throw error;

                }

            })

        );

        return results;

    } catch (error) {

        console.error("Push Notification Error:", error);

    }

};

export const sendOrderNotification = async (order) => {

    const statusMessages = {

        pending: "Your order is confirmed!",

        processing: "Your order is being processed.",

        shipped: "Your order has been shipped! Delivery expected in 3-5 days.",

        delivered: "Your order has been delivered! Enjoy your products.",

        cancelled: "Your order has been cancelled.",

    };

    return await sendNotification(

        order.user,

        "Order Update",

        statusMessages[order.status] || "Your order has been updated.",

        {

            data: {

                type: "order",

                orderId: order._id,

                status: order.status,

            },

        }

    );

};

export default {

    sendNotification,

    sendOrderNotification,

};