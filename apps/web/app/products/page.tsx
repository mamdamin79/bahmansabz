import {
  Box,
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
import { ProductsSearchInput } from "./_components/ProductsSearchInput";
import { ProductsSortSelect } from "./_components/ProductsSortSelect";

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
  const pageNum = page && page >= 1 ? page : 1;
  const skipValue = skip(pageNum);
  const params = new URLSearchParams();
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (q && q.trim()) params.set("q", q.trim());
  params.set("limit", limit.toString());
  params.set("skip", String(skipValue));
  if (q && q.trim()) {
    return `${API_BASE}/products/search?${params.toString()}`;
  }
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
  const { products, total, limit } = await getProducts(
    sortBy,
    order,
    q,
    pageNum,
  );
  return (
    <main>
      <Container maxW="7xl" py={8} px={4}>
        <Heading as="h1" size="xl" mb={6}>
          Products
        </Heading>
        <Flex direction="column" minW={0} w="full">
          <Flex
            mb={6}
            gap={4}
            flex={1}
            minW={0}
            direction={{ base: "column", sm: "row" }}
            align={{ base: "stretch", sm: "center" }}
          >
            <ProductsSearchInput
              defaultValue={q ?? ""}
              sortBy={sortBy ?? undefined}
              order={order ?? undefined}
            />
            <ProductsSortSelect
              sortBy={sortBy ?? undefined}
              order={order ?? undefined}
              q={q ?? undefined}
            />
          </Flex>
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

              <Box mt={4} display="flex" justifyContent="center">
                <PaginationComponent
                  page={pageNum}
                  total={total}
                  pageSize={PAGE_SIZE}
                  sortBy={sortBy ?? undefined}
                  order={order ?? undefined}
                  q={q ?? undefined}
                />
              </Box>
            </>
          )}
        </Flex>
      </Container>
    </main>
  );
}
