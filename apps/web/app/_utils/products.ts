import type { Product, ProductsResponse } from "@/app/_types/products.types";
import { API_BASE } from "./api";

const PAGE_SIZE = 12;

function buildProductsUrl(
  sortBy: string | null | undefined,
  order: string | null | undefined,
  q: string | null | undefined,
  page: number | null | undefined,
): string {
  const pageNum = page && page >= 1 ? page : 1;
  const skipValue = (pageNum - 1) * PAGE_SIZE;
  const params = new URLSearchParams();
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (q && q.trim()) params.set("q", q.trim());
  params.set("limit", PAGE_SIZE.toString());
  params.set("skip", String(skipValue));
  if (q && q.trim()) {
    return `${API_BASE}/products/search?${params.toString()}`;
  }
  return `${API_BASE}/products?${params.toString()}`;
}

export async function getProducts(
  sortBy: string | null | undefined,
  order: string | null | undefined,
  q: string | null | undefined,
  page: number | null | undefined,
): Promise<ProductsResponse> {
  const url = buildProductsUrl(sortBy, order, q, page);
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(
        `[Products] API error ${res.status} ${res.statusText}: ${url}`,
      );
      return { products: [], total: 0, skip: 0, limit: 0 };
    }
    return (await res.json()) as ProductsResponse;
  } catch (err) {
    console.error("[Products] Failed to fetch products:", err);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}

export { PAGE_SIZE };
