import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/app/_utils/format";
import { getProduct } from "@/app/_utils/products";

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

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const discountedPrice =
    product.discountPercentage != null && product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : null;

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
          {/* Image gallery */}
          <Box flex={1} maxW={{ md: "50%" }}>
            {product.images && product.images.length > 0 ? (
              <VStack gap={3}>
                <Box
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                  _dark={{ bg: "gray.800" }}
                  w="full"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      maxHeight: "500px",
                    }}
                  />
                </Box>
                {product.images.length > 1 && (
                  <SimpleGrid columns={{ base: 3, sm: 4 }} gap={2} w="full">
                    {product.images.slice(1).map((img, i) => (
                      <Box
                        key={img}
                        borderRadius="md"
                        overflow="hidden"
                        bg="gray.100"
                        borderWidth="1px"
                        borderColor="gray.200"
                        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                      >
                        <img
                          src={img}
                          alt={`${product.title} - ${i + 2}`}
                          style={{
                            width: "100%",
                            aspectRatio: "1",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            ) : product.thumbnail ? (
              <Box
                borderRadius="lg"
                overflow="hidden"
                bg="gray.100"
                _dark={{ bg: "gray.800" }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    maxHeight: "500px",
                  }}
                />
              </Box>
            ) : null}
          </Box>

          {/* Product details */}
          <VStack flex={1} align="stretch" gap={5}>
            <Box>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
                textTransform="capitalize"
                mb={1}
              >
                {product.category}
              </Text>
              <Heading as="h1" size="2xl">
                {product.title}
              </Heading>
              {product.brand && (
                <Text
                  fontSize="md"
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                  mt={1}
                >
                  by {product.brand}
                </Text>
              )}
            </Box>

            {/* Price */}
            <HStack gap={3} align="baseline">
              <Text fontSize="3xl" fontWeight="bold">
                {formatPrice(discountedPrice ?? product.price)}
              </Text>
              {discountedPrice != null && (
                <>
                  <Text
                    fontSize="lg"
                    textDecoration="line-through"
                    color="gray.400"
                  >
                    {formatPrice(product.price)}
                  </Text>
                  <Badge colorPalette="green" size="sm">
                    -{product.discountPercentage}%
                  </Badge>
                </>
              )}
            </HStack>

            {/* Rating & Stock */}
            <HStack gap={4}>
              {product.rating != null && (
                <HStack gap={1}>
                  <Text fontSize="sm" fontWeight="medium">
                    ★ {product.rating.toFixed(2)}
                  </Text>
                </HStack>
              )}
              {product.availabilityStatus && (
                <Badge
                  colorPalette={
                    product.availabilityStatus === "In Stock"
                      ? "green"
                      : product.availabilityStatus === "Low Stock"
                        ? "yellow"
                        : "red"
                  }
                  size="sm"
                >
                  {product.availabilityStatus}
                </Badge>
              )}
              {product.stock != null && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                >
                  {product.stock} in stock
                </Text>
              )}
            </HStack>

            {/* Description */}
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

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="subtle" size="sm">
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}

            {/* Product info grid */}
            <SimpleGrid
              columns={2}
              gap={3}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
            >
              {product.sku && (
                <>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    SKU
                  </Text>
                  <Text fontSize="sm">{product.sku}</Text>
                </>
              )}
              {product.weight != null && (
                <>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Weight
                  </Text>
                  <Text fontSize="sm">{product.weight} kg</Text>
                </>
              )}
              {product.dimensions && (
                <>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Dimensions
                  </Text>
                  <Text fontSize="sm">
                    {product.dimensions.width} × {product.dimensions.height} ×{" "}
                    {product.dimensions.depth} cm
                  </Text>
                </>
              )}
              {product.minimumOrderQuantity != null && (
                <>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Min. order
                  </Text>
                  <Text fontSize="sm">{product.minimumOrderQuantity} pcs</Text>
                </>
              )}
            </SimpleGrid>

            {/* Shipping & Warranty */}
            <VStack align="stretch" gap={2}>
              {product.shippingInformation && (
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Shipping:
                  </Text>
                  <Text fontSize="sm">{product.shippingInformation}</Text>
                </HStack>
              )}
              {product.warrantyInformation && (
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Warranty:
                  </Text>
                  <Text fontSize="sm">{product.warrantyInformation}</Text>
                </HStack>
              )}
              {product.returnPolicy && (
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Returns:
                  </Text>
                  <Text fontSize="sm">{product.returnPolicy}</Text>
                </HStack>
              )}
            </VStack>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <Box>
                <Heading as="h2" size="md" mb={3}>
                  Reviews ({product.reviews.length})
                </Heading>
                <VStack align="stretch" gap={3}>
                  {product.reviews.map((review, i) => (
                    <Box
                      key={`${review.reviewerEmail}-${i}`}
                      p={4}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor="gray.200"
                      _dark={{ borderColor: "gray.700" }}
                    >
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="sm" fontWeight="medium">
                          {review.reviewerName}
                        </Text>
                        <HStack gap={1}>
                          <Text fontSize="sm" color="yellow.500">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </Text>
                        </HStack>
                      </HStack>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                      >
                        {review.comment}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.400"
                        _dark={{ color: "gray.500" }}
                        mt={1}
                      >
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </Flex>
      </Container>
    </main>
  );
}
