import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { Product } from "@/app/_types/products.types";

type ProductInfoProps = Pick<
  Product,
  | "sku"
  | "weight"
  | "dimensions"
  | "minimumOrderQuantity"
  | "shippingInformation"
  | "warrantyInformation"
  | "returnPolicy"
>;

export function ProductInfo({
  sku,
  weight,
  dimensions,
  minimumOrderQuantity,
  shippingInformation,
  warrantyInformation,
  returnPolicy,
}: ProductInfoProps) {
  const hasSpecs =
    sku || weight != null || dimensions || minimumOrderQuantity != null;
  const hasPolicies =
    shippingInformation || warrantyInformation || returnPolicy;

  if (!hasSpecs && !hasPolicies) return null;

  return (
    <>
      {/* Specs grid */}
      {hasSpecs && (
        <SimpleGrid
          columns={2}
          gap={3}
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
        >
          {sku && (
            <>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                SKU
              </Text>
              <Text fontSize="sm">{sku}</Text>
            </>
          )}
          {weight != null && (
            <>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Weight
              </Text>
              <Text fontSize="sm">{weight} kg</Text>
            </>
          )}
          {dimensions && (
            <>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Dimensions
              </Text>
              <Text fontSize="sm">
                {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
              </Text>
            </>
          )}
          {minimumOrderQuantity != null && (
            <>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Min. order
              </Text>
              <Text fontSize="sm">{minimumOrderQuantity} pcs</Text>
            </>
          )}
        </SimpleGrid>
      )}

      {/* Shipping & Warranty */}
      {hasPolicies && (
        <VStack align="stretch" gap={2}>
          {shippingInformation && (
            <HStack gap={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Shipping:
              </Text>
              <Text fontSize="sm">{shippingInformation}</Text>
            </HStack>
          )}
          {warrantyInformation && (
            <HStack gap={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Warranty:
              </Text>
              <Text fontSize="sm">{warrantyInformation}</Text>
            </HStack>
          )}
          {returnPolicy && (
            <HStack gap={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                Returns:
              </Text>
              <Text fontSize="sm">{returnPolicy}</Text>
            </HStack>
          )}
        </VStack>
      )}
    </>
  );
}
