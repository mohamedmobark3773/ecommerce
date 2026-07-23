import dotenv from "dotenv";

dotenv.config();

const config = {

    nodeEnv: process.env.NODE_ENV || "development",

    port: Number(process.env.PORT) || 5000,

    mongoURI: process.env.MONGODB_URI,

    redisUrl: process.env.REDIS_URL,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

    jwtAccessExpiresIn:
        process.env.JWT_ACCESS_EXPIRES_IN || "15m",

    jwtRefreshExpiresIn:
        process.env.JWT_REFRESH_EXPIRES_IN || "7d",

    stripeSecretKey:
        process.env.STRIPE_SECRET_KEY,

    stripeWebhookSecret:
        process.env.STRIPE_WEBHOOK_SECRET,

    paypalClientId:
        process.env.PAYPAL_CLIENT_ID,

    paypalClientSecret:
        process.env.PAYPAL_CLIENT_SECRET,

    awsAccessKeyId:
        process.env.AWS_ACCESS_KEY_ID,

    awsSecretAccessKey:
        process.env.AWS_SECRET_ACCESS_KEY,

    awsRegion:
        process.env.AWS_S3_REGION,

    awsBucket:
        process.env.AWS_S3_BUCKET,

    mailHost:
        process.env.MAIL_HOST,

    mailPort:
        Number(process.env.MAIL_PORT),

    mailSecure:
        process.env.MAIL_SECURE === "true",

    mailUser:
        process.env.MAIL_USER,

    mailPass:
        process.env.MAIL_PASS,

    mailFrom:
        process.env.MAIL_FROM,

    twilioAccountSid:
        process.env.TWILIO_ACCOUNT_SID,

    twilioAuthToken:
        process.env.TWILIO_AUTH_TOKEN,

    twilioPhoneNumber:
        process.env.TWILIO_PHONE_NUMBER,

    googleMapsApiKey:
        process.env.GOOGLE_MAPS_API_KEY,

};

const requiredVariables = [

    "MONGODB_URI",

    "JWT_ACCESS_SECRET",

    "JWT_REFRESH_SECRET",

];

requiredVariables.forEach((key) => {

    if (!process.env[key]) {

        throw new Error(`Missing environment variable: ${key}`);

    }

});

export default config;