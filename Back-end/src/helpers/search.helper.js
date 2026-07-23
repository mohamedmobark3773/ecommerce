export const buildSearchQuery = (term = '') => ({ $regex: term, $options: 'i' });
export const normalizeSearchTerm = (term = '') => term.trim().toLowerCase();

export default { buildSearchQuery, normalizeSearchTerm };

