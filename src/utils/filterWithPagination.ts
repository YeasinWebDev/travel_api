import { Model } from "mongoose";

interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  searchFields?: string[];
  filters?: Record<string, any>;
}

export const filterWithPagination = async <T>(
  model: Model<T>,
  options: QueryOptions
) => {
  const {
    page = 1,
    limit = 10,
    search,
    searchFields = [],
    filters = {},
  } = options;

  // ---- Build Query ----
  const query: any = {};

  // Search
  if (search) {
    query.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }

  // Filters (only add if not empty)
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query[key] = value;
  });

  // Pagination
  const skip = (page - 1) * limit;

  // ---- Execute Query ----
  const [data, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit),
    model.countDocuments(query),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};
