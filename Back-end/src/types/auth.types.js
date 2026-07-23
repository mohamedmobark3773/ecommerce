/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterPayload
 * @property {string} email
 * @property {string} password
 * @property {string} [name]
 */

/**
 * @typedef {Object} AuthTokenPayload
 * @property {string} sub
 * @property {string} [role]
 * @property {number} [iat]
 * @property {number} [exp]
 */

export {};

