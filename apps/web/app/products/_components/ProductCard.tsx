import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  title: string;
  price: string | number;
  imageUrl?: string;
}

export function ProductCard({ id, title, price, imageUrl }: ProductCardProps) {
  const displayPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : price;

  return (
    <Link href={`/products/${id}`} style={{ textDecoration: "none" }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="gray.50"
        borderColor="gray.200"
        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        transition="box-shadow 0.2s"
        _hover={{ boxShadow: "md" }}
      >
        <Box
          position="relative"
          width="100%"
          paddingBottom="100%"
          bg="gray.200"
          _dark={{ bg: "gray.700" }}
        >
          {imageUrl ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
            >
              <img
                src={imageUrl}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ) : null}
        </Box>
        <Box p={4}>
          <Heading as="h2" size="sm" mb={2} lineClamp={2}>
            {title}
          </Heading>
          <Text fontWeight="semibold" color="gray.700" _dark={{ color: "gray.200" }}>
            {displayPrice}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
