import type { PaginationParams, SortOrder } from "~/shared/api/types";

/** GET /api/product/trending */
export type TrendingProductsParams = PaginationParams & {
  order?: SortOrder;
};

/** GET /api/product */
export type ListProductsParams = PaginationParams & {
  search?: string;
  sort?: "name" | "price" | "created_at";
  order?: SortOrder;
};
