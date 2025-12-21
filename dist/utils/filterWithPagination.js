"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterWithPagination = void 0;
const filterWithPagination = (model, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search, searchFields = [], filters = {}, populate = [], sort = { createdAt: -1 } } = options;
    // ---- Build Query ----
    const query = {};
    // Search
    if (search) {
        query.$or = searchFields.map((field) => ({
            [field]: { $regex: search, $options: "i" },
        }));
    }
    // Filters (only add if not empty)
    Object.entries(filters).forEach(([key, value]) => {
        if (value)
            query[key] = value;
    });
    // Pagination
    const skip = (page - 1) * limit;
    // ---- Execute Query ----
    const [data, total] = yield Promise.all([model.find(query).sort(sort).skip(skip).limit(limit).populate(populate), model.countDocuments(query)]);
    return {
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data,
    };
});
exports.filterWithPagination = filterWithPagination;
