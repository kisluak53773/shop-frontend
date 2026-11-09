import type { FC } from "react";
import { ProductCard, type Product } from "~/entities/product";
import { Carousel } from "~/shared/ui";

type Props = {
  products: Product[];
};

export const TrendingProducts: FC<Props> = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-300 px-4 py-10">
      <div className="mb-10 border-b border-line">
        <h2 className="relative inline-block pb-4 text-2xl leading-7.5 font-bold text-body after:absolute after:inset-x-0 after:-bottom-px after:h-0.75 after:bg-primary">
          Grab the best deal on{" "}
          <span className="text-primary">Trending Products</span>
        </h2>
      </div>

      <Carousel
        items={products}
        getKey={(product) => product.id}
        renderItem={(product) => <ProductCard product={product} />}
      />
    </section>
  );
};
