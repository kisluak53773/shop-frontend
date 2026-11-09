export type SortOrder = "asc" | "desc";

export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type Paginated<T> = {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
    links: {
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }[];
  };
};
