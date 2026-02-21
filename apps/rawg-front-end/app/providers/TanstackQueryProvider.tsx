"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";
import { tanstackQueryClient } from "./tanstackQueryClient";

export const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <div style={{ direction: "ltr" }}>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      )}
    </QueryClientProvider>
  );
};
