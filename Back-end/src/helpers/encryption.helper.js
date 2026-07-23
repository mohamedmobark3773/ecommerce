import crypto from 'crypto';

export const hashString = (value) => crypto.createHash('sha256').update(String(value)).digest('hex');
export const compareHash = (value, hash) => hashString(value) === hash;

export default { hashString, compareHash };

