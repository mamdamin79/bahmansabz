import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getProducts, PAGE_SIZE } from "@/app/_utils/products";
import { PaginationComponent } from "./_components/PaginationComponent";
import { ProductCard } from "./_components/ProductCard";
import { ProductsSearchInput } from "./_components/ProductsSearchInput";
import { ProductsSortSelect } from "./_components/ProductsSortSelect";

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
  const pageParam = getStringParam(params.page);
  const pageNum = Math.max(1, Number(pageParam) || 1);
  const { products, total } = await getProducts(sortBy, order, q, pageNum);
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
                    id={product.id}
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
