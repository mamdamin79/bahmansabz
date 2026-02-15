
export interface Product {
  id: number;
  title: string;
  description?: string;
  category: string;
  price: number;
  thumbnail?: string;
  images?: string[];
}

/** DummyJSON API response: GET /products */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
