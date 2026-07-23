import crypto from 'crypto';

export const generateToken = (length = 32) => crypto.randomBytes(length).toString('hex').slice(0, length);
export const verifyToken = (token, expected) => token === expected;

export default { generateToken, verifyToken };

