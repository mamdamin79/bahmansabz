"use client";

import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { buildProductsQuery, productsPath } from "./products-query";

interface ProductsSearchInputProps {
  defaultValue?: string;
  sortBy?: string;
  order?: string;
}

export function ProductsSearchInput({
  defaultValue = "",
  sortBy,
  order,
}: ProductsSearchInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputRef.current?.value?.trim() ?? "";
    const query = buildProductsQuery({ sortBy, order, q: q || undefined });
    router.push(productsPath(query));
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: 0 }}>
      <Input
        ref={inputRef}
        name="q"
        placeholder="Search products…"
        defaultValue={defaultValue}
        maxW={{ sm: "xs" }}
        w="full"
        aria-label="Search products"
      />
    </form>
  );
}
