export const normalizeFilter = (filter = {}) => {
  const normalized = { ...filter };
  Object.keys(normalized).forEach((key) => {
    if (normalized[key] === '' || normalized[key] === null || normalized[key] === undefined) {
      delete normalized[key];
    }
  });
  return normalized;
};

export default { normalizeFilter };

