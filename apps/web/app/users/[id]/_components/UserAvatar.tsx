import { Box } from "@chakra-ui/react";

interface UserAvatarProps {
  src: string;
  alt: string;
}

export function UserAvatar({ src, alt }: UserAvatarProps) {
  return (
    <Box
      borderRadius="full"
      overflow="hidden"
      bg="gray.100"
      _dark={{ bg: "gray.800" }}
      width={24}
      height={24}
      flexShrink={0}
    >
      <img
        src={src}
        alt={alt}
        width={96}
        height={96}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
}
