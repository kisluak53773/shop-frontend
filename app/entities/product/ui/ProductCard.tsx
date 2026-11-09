import type { FC } from "react";
import clsx from "clsx";
import type { Product } from "../types";

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: FC<Props> = ({ product, className }) => {
  const image = product.primaryImage;
  const inStock = product.stockQuantity > 0;

  return (
    <article
      className={clsx(
        "flex w-56.75 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow",
        "hover:border-primary hover:shadow-lg",
        className,
      )}
    >
      <div className="flex h-47 items-center justify-center p-4">
        {image && (
          <img
            src={image.path}
            alt={image.altText ?? product.name}
            loading="lazy"
            className="size-full object-contain"
          />
        )}
      </div>

      <div className="rounded-b-[0.9375rem] bg-white px-3.25 pt-3 pb-2.5">
        <h3 className="truncate text-base leading-4.5 font-semibold text-heading">
          {product.name}
        </h3>
        <p className="mt-2.5 text-base leading-4.5 font-bold text-heading">
          {product.price.formatted}
        </p>
        <p
          className={clsx(
            "mt-2.5 border-t border-border pt-2.5 text-base leading-4.5 font-semibold",
            inStock ? "text-success" : "text-body",
          )}
        >
          {inStock ? "In stock" : "Out of stock"}
        </p>
      </div>
    </article>
  );
};
