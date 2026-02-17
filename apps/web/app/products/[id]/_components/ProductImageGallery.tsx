"use client";

import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";

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
  const [selectedIndex, setSelectedIndex] = useState(0);

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
            src={images[selectedIndex]}
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
            {images.map((img, i) => (
              <Box
                key={img}
                borderRadius="md"
                overflow="hidden"
                bg="gray.100"
                borderWidth="2px"
                borderColor={i === selectedIndex ? "blue.500" : "gray.200"}
                _dark={{
                  bg: "gray.800",
                  borderColor: i === selectedIndex ? "blue.400" : "gray.700",
                }}
                cursor="pointer"
                opacity={i === selectedIndex ? 1 : 0.7}
                _hover={{ opacity: 1 }}
                transition="opacity 0.2s, border-color 0.2s"
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={img}
                  alt={`${title} - ${i + 1}`}
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
