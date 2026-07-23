import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const verifyMailer = async () => {
    try {
        await transporter.verify();
        console.log("📧 Mail server connected");
    } catch (error) {
        console.error("Mail Server Error:", error);
        throw error;
    }
};

export const sendEmail = async ({
    to,
    subject,
    text = "",
    html = "",
    cc,
    bcc,
    attachments = [],
}) => {
    try {
        return await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            cc,
            bcc,
            subject,
            text,
            html,
            attachments,
        });
    } catch (error) {
        console.error("Send Email Error:", error);
        throw error;
    }
};

export default sendEmail;
