import axios from "axios";
import config from "../config/config.js";

const twilioClient = axios.create({
    baseURL: `https://api.twilio.com/2010-04-01/Accounts/${config.twilioAccountSid}`,
    auth: {
        username: config.twilioAccountSid,
        password: config.twilioAuthToken,
    },
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

export const sendSms = async ({
    to,
    body,
    mediaUrl = null,
}) => {

    try {

        if (!to) {
            throw new Error("Recipient phone number is required.");
        }

        if (!body) {
            throw new Error("Message body is required.");
        }

        const payload = new URLSearchParams({

            To: to,

            From: config.twilioPhoneNumber,

            Body: body,

        });

        if (mediaUrl) {

            payload.append("MediaUrl", mediaUrl);

        }

        const { data } = await twilioClient.post(

            "/Messages.json",

            payload

        );

        return {

            success: true,

            sid: data.sid,

            status: data.status,

            to: data.to,

            from: data.from,

        };

    } catch (error) {

        console.error(
            "Twilio SMS Error:",
            error.response?.data || error.message
        );

        return {

            success: false,

            message:
                error.response?.data?.message ||
                error.message,

        };

    }

};

export default sendSms;