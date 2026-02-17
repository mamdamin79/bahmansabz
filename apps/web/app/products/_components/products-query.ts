export function buildProductsQuery(params: {
  sortBy?: string;
  order?: string;
  q?: string;
  page?: number;
}): string {
  const search = new URLSearchParams();
  if (params.sortBy) search.set("sortBy", params.sortBy);
  if (params.order) search.set("order", params.order);
  if (params.q?.trim()) search.set("q", params.q.trim());
  if (params.page != null && params.page > 1)
    search.set("page", String(params.page));
  return search.toString();
}

export function productsPath(query: string): string {
  return query ? `/products?${query}` : "/products";
}
