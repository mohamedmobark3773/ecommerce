/**
 * @typedef {Object} OrderItem
 * @property {string} productId
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} OrderPayload
 * @property {string} customerId
 * @property {Array<OrderItem>} items
 * @property {string} [status]
 * @property {string} [currency]
 */

export {};

