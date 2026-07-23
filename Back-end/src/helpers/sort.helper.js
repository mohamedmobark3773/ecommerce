export const buildSortQuery = (sort = 'createdAt') => ({ [sort]: -1 });
export const normalizeSortField = (sort = 'createdAt') => sort.replace(/[^a-zA-Z0-9_.]/g, '');

export default { buildSortQuery, normalizeSortField };

