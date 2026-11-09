import { apiFetch, withQuery } from "~/shared/api/client.server";
import type { Paginated } from "~/shared/api/types";
import { serverEnv } from "~/shared/lib/env.server";
import type { Product, ProductImage } from "../types";
import type { ListProductsParams, TrendingProductsParams } from "./types";

const absoluteUrl = (path: string) =>
  new URL(path, serverEnv.API_BASE_URL).toString();

const withAbsoluteUrls = (image: ProductImage): ProductImage => ({
  ...image,
  path: absoluteUrl(image.path),
  mobilePath: image.mobilePath ? absoluteUrl(image.mobilePath) : null,
});

const normalizeProduct = (product: Product): Product => ({
  ...product,
  primaryImage: product.primaryImage
    ? withAbsoluteUrls(product.primaryImage)
    : product.primaryImage,
  images: product.images?.map(withAbsoluteUrls),
});

const normalizePage = (page: Paginated<Product>): Paginated<Product> => ({
  ...page,
  data: page.data.map(normalizeProduct),
});

export const fetchProducts = async (params: ListProductsParams = {}) => {
  const page = await apiFetch<Paginated<Product>>(
    withQuery("/api/product", params),
  );

  return normalizePage(page);
};

export const fetchTrendingProducts = async (
  params: TrendingProductsParams = {},
) => {
  const page = await apiFetch<Paginated<Product>>(
    withQuery("/api/product/trending", params),
  );

  return normalizePage(page);
};
