export const toInt = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const paginate = (page = 1, limit = 20): { offset: number; limit: number } => ({
  offset: (page - 1) * limit,
  limit
});
