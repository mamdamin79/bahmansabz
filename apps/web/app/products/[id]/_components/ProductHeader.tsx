import { Box, Heading, Text } from "@chakra-ui/react";

interface ProductHeaderProps {
  title: string;
  category: string;
  brand?: string;
}

export function ProductHeader({ title, category, brand }: ProductHeaderProps) {
  return (
    <Box>
      <Text
        fontSize="sm"
        color="gray.500"
        _dark={{ color: "gray.400" }}
        textTransform="capitalize"
        mb={1}
      >
        {category}
      </Text>
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      {brand && (
        <Text
          fontSize="md"
          color="gray.500"
          _dark={{ color: "gray.400" }}
          mt={1}
        >
          by {brand}
        </Text>
      )}
    </Box>
  );
}
