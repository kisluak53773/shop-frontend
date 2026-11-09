import type { FC } from "react";
import { useLoaderData, type MetaFunction } from "react-router";
import { TrendingProducts } from "~/widgets/trending-products";
import type { homeLoader } from "./loader.server";

export const meta: MetaFunction = () => [{ title: "Home" }];

export const HomePage: FC = () => {
  const { trending } = useLoaderData<typeof homeLoader>();

  return <TrendingProducts products={trending} />;
};
