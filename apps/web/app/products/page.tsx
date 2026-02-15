import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { ProductsResponse } from "@/app/_types/products.types";
import { PaginationComponent } from "./_components/PaginationComponent";
import { ProductCard } from "./_components/ProductCard";
// import { ProductsToolbar } from "@/app/products/_components/ProductsToolbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com";

const PAGE_SIZE = 12;

const skip = (page: number) => (page - 1) * PAGE_SIZE;
const limit = PAGE_SIZE;
function buildProductsUrl(
  sortBy: string | null | undefined,
  order: string | null | undefined,
  q: string | null | undefined,
  page: number | null | undefined,
): string {
  const params = new URLSearchParams();
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (q && q.trim()) params.set("q", q.trim());
  if (page) params.set("page", page.toString());
  if (q && q.trim()) {
    const base = `${API_BASE}/products/search`;
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  params.set("limit", limit.toString());
  params.set("skip", page ? skip(page).toString() : "0");
  return `${API_BASE}/products?${params.toString()}`;
}

async function getProducts(
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
    const data = (await res.json()) as ProductsResponse;
    return data;
  } catch (err) {
    console.error("[Products] Failed to fetch products:", err);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}

function getStringParam(
  value: string | string[] | undefined,
): string | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const sortBy = getStringParam(params.sortBy);
  const order = getStringParam(params.order);
  const q = getStringParam(params.q);
  const pageParam = getStringParam(params.page);
  const pageNum = Math.max(1, Number(pageParam) || 1);
  const { products, total, skip, limit } = await getProducts(sortBy, order, q, pageNum);
  return (
    <main>
      <Container maxW="7xl" py={8} px={4}>
        <Heading as="h1" size="xl" mb={6}>
          Products
        </Heading>
        <Flex direction="column" minW={0} w="full">
          {/* <ProductsToolbar
            sortBy={sortBy ?? undefined}
            order={order ?? undefined}
            q={q ?? undefined}
          /> */}
          {products.length === 0 ? (
            <VStack
              py={16}
              gap={3}
              align="center"
              textAlign="center"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              <Text fontSize="lg" fontWeight="medium">
                No products found
              </Text>
              {q?.trim() ? (
                <Text fontSize="sm">Try adjusting your search or filters.</Text>
              ) : (
                <Text fontSize="sm">
                  There are no products to show right now.
                </Text>
              )}
            </VStack>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4} flex={1}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.thumbnail}
                  />
                ))}
              </SimpleGrid>
              <PaginationComponent
                page={pageNum}
                total={total}
                pageSize={limit}
                sortBy={sortBy ?? undefined}
                order={order ?? undefined}
                q={q ?? undefined}
              />
            </>
          )}
        </Flex>
      </Container>
    </main>
  );
}
