//src/utils/crypto.js

import crypto from "crypto";


const secretKey = crypto.randomBytes(64).toString("hex");

export const cryptoUtils = {
    secretKey,
};  

export default cryptoUtils;
