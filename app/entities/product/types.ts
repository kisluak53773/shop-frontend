export type Money = {
  /** Minor units, e.g. cents. */
  amount: number;
  currency: string;
  formatted: string;
};

export type ProductImage = {
  id: number;
  path: string;
  mobilePath: string | null;
  isPrimary: boolean;
  sortOrder: number;
  altText: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: Money;
  primaryImage?: ProductImage | null;
  images?: ProductImage[];
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};
