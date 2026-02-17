import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { ProductReview } from "@/app/_types/products.types";

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <Box>
      <Heading as="h2" size="md" mb={3}>
        Reviews ({reviews.length})
      </Heading>
      <VStack align="stretch" gap={3}>
        {reviews.map((review, i) => (
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
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
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
  );
}
