import { Badge, HStack, Text } from "@chakra-ui/react";
import { formatPrice } from "@/app/_utils/format";

interface ProductPriceProps {
  price: number;
  discountPercentage?: number;
  rating?: number;
  availabilityStatus?: string;
  stock?: number;
}

export function ProductPrice({
  price,
  discountPercentage,
  rating,
  availabilityStatus,
  stock,
}: ProductPriceProps) {
  const discountedPrice =
    discountPercentage != null && discountPercentage > 0
      ? price * (1 - discountPercentage / 100)
      : null;

  return (
    <>
      {/* Price */}
      <HStack gap={3} align="baseline">
        <Text fontSize="3xl" fontWeight="bold">
          {formatPrice(discountedPrice ?? price)}
        </Text>
        {discountedPrice != null && (
          <>
            <Text fontSize="lg" textDecoration="line-through" color="gray.400">
              {formatPrice(price)}
            </Text>
            <Badge colorPalette="green" size="sm">
              -{discountPercentage}%
            </Badge>
          </>
        )}
      </HStack>

      {/* Rating & Stock */}
      <HStack gap={4}>
        {rating != null && (
          <HStack gap={1}>
            <Text fontSize="sm" fontWeight="medium">
              ★ {rating.toFixed(2)}
            </Text>
          </HStack>
        )}
        {availabilityStatus && (
          <Badge
            colorPalette={
              availabilityStatus === "In Stock"
                ? "green"
                : availabilityStatus === "Low Stock"
                  ? "yellow"
                  : "red"
            }
            size="sm"
          >
            {availabilityStatus}
          </Badge>
        )}
        {stock != null && (
          <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
            {stock} in stock
          </Text>
        )}
      </HStack>
    </>
  );
}
