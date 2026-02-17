import { Box, SimpleGrid, VStack } from "@chakra-ui/react";

interface ProductImageGalleryProps {
  title: string;
  images?: string[];
  thumbnail?: string;
}

export function ProductImageGallery({
  title,
  images,
  thumbnail,
}: ProductImageGalleryProps) {
  if (images && images.length > 0) {
    return (
      <VStack gap={3}>
        <Box
          borderRadius="lg"
          overflow="hidden"
          bg="gray.100"
          _dark={{ bg: "gray.800" }}
          w="full"
        >
          <img
            src={images[0]}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              maxHeight: "500px",
            }}
          />
        </Box>
        {images.length > 1 && (
          <SimpleGrid columns={{ base: 3, sm: 4 }} gap={2} w="full">
            {images.slice(1).map((img, i) => (
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
                  alt={`${title} - ${i + 2}`}
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
    );
  }

  if (thumbnail) {
    return (
      <Box
        borderRadius="lg"
        overflow="hidden"
        bg="gray.100"
        _dark={{ bg: "gray.800" }}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            maxHeight: "500px",
          }}
        />
      </Box>
    );
  }

  return null;
}
