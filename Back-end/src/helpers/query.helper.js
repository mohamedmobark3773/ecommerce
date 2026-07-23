export const buildQuery = (query = {}) => new URLSearchParams(query).toString();
export const parseQuery = (query = '') => Object.fromEntries(new URLSearchParams(query));

export default { buildQuery, parseQuery };

