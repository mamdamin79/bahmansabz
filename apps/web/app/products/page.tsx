import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import type { ProductsResponse } from "@/app/_types/products.types";
import { Pagination } from "./_components/Pagination";
import { ProductCard } from "./_components/ProductCard";
import { ProductsToolbar } from "@/app/products/_components/ProductsToolbar";


function buildProductsUrl(
  sortBy: string | null | undefined,
  order: string | null | undefined,
  q: string | null | undefined
): string {
  const params = new URLSearchParams();
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  if (q && q.trim()) params.set("q", q.trim());

  if (q && q.trim()) {
    const base = `${process.env.NEXT_PUBLIC_API_URL}/products/search`;
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  params.set("limit", "12");
  return `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`;
}

async function getProducts(
  sortBy: string | null | undefined,
  order: string | null | undefined,
  q: string | null | undefined
): Promise<ProductsResponse> {
  const url = buildProductsUrl(sortBy, order, q);
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return { products: [], total: 0, skip: 0, limit: 0 };
  return res.json();
}

function getStringParam(
  value: string | string[] | undefined
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

  const { products } = await getProducts(sortBy, order, q);
  return (
    <main>
      <Container maxW="7xl" py={8} px={4}>
        <Heading as="h1" size="xl" mb={6}>
          Products
        </Heading>
        <Flex direction="column" minW={0} w="full">
          <ProductsToolbar
            sortBy={sortBy ?? undefined}
            order={order ?? undefined}
            q={q ?? undefined}
          />
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            gap={4}
            flex={1}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.thumbnail}
              />
            ))}
          </SimpleGrid>
          <Pagination />
        </Flex>
      </Container>
    </main>
  );
}
