export const paginate = ({ page = 1, limit = 10, total = 0 }) => ({
  page: Number(page),
  limit: Number(limit),
  total,
  totalPages: Math.max(1, Math.ceil(total / Number(limit))),
});

export default { paginate };

