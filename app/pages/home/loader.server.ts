import { fetchTrendingProducts } from "~/entities/product/api/product.server";

export async function homeLoader() {
  try {
    const { data } = await fetchTrendingProducts({ perPage: 5, order: "desc" });

    return { trending: data };
  } catch (error) {
    console.error("Failed to load trending products", error);

    return { trending: [] };
  }
}
