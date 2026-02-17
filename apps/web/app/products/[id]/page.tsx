import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/app/_utils/products";
import { ProductHeader } from "./_components/ProductHeader";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ProductInfo } from "./_components/ProductInfo";
import { ProductPrice } from "./_components/ProductPrice";
import { ProductReviews } from "./_components/ProductReviews";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.title,
    description:
      product.description ?? `Buy ${product.title} at the best price.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [{ url: product.thumbnail }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Container maxW="6xl" py={8} px={4}>
        <Box mb={6}>
          <Button asChild variant="ghost" size="sm">
            <Link href="/products">← Back to products</Link>
          </Button>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          align="flex-start"
        >
          <Box flex={1} maxW={{ md: "50%" }}>
            <ProductImageGallery
              title={product.title}
              images={product.images}
              thumbnail={product.thumbnail}
            />
          </Box>

          <VStack flex={1} align="stretch" gap={5}>
            <ProductHeader
              title={product.title}
              category={product.category}
              brand={product.brand}
            />

            <ProductPrice
              price={product.price}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              availabilityStatus={product.availabilityStatus}
              stock={product.stock}
            />

            {product.description && (
              <Text
                fontSize="md"
                color="gray.700"
                _dark={{ color: "gray.300" }}
                lineHeight="tall"
              >
                {product.description}
              </Text>
            )}

            {product.tags && product.tags.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="subtle" size="sm">
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}

            <ProductInfo
              sku={product.sku}
              weight={product.weight}
              dimensions={product.dimensions}
              minimumOrderQuantity={product.minimumOrderQuantity}
              shippingInformation={product.shippingInformation}
              warrantyInformation={product.warrantyInformation}
              returnPolicy={product.returnPolicy}
            />

            {product.reviews && product.reviews.length > 0 && (
              <ProductReviews reviews={product.reviews} />
            )}
          </VStack>
        </Flex>
      </Container>
    </main>
  );
}
