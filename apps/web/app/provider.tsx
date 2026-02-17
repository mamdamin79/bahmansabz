"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableColorScheme
      disableTransitionOnChange
    >
      <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
    </ThemeProvider>
  );
}
