"use client";

import { HStack, NativeSelect, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { buildProductsQuery, productsPath } from "./products-query";

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name A–Z" },
  { value: "title-desc", label: "Name Z–A" },
] as const;

interface ProductsSortSelectProps {
  sortBy?: string;
  order?: string;
  q?: string;
}

export function ProductsSortSelect({
  sortBy,
  order,
  q,
}: ProductsSortSelectProps) {
  const router = useRouter();
  const sortValue = sortBy && order ? `${sortBy}-${order}` : "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      router.push(productsPath(buildProductsQuery({ q })));
      return;
    }
    const [nextSortBy, nextOrder] = value.split("-") as [string, string];
    router.push(
      productsPath(
        buildProductsQuery({ sortBy: nextSortBy, order: nextOrder, q })
      )
    );
  };

  return (
    <HStack align="center" gap={2} flexShrink={0}>
      <Text
        as="label"
        htmlFor="products-sort"
        fontSize="sm"
        fontWeight="medium"
        color="gray.600"
        _dark={{ color: "gray.400" }}
        whiteSpace="nowrap"
      >
        Sort by
      </Text>
      <NativeSelect.Root size="md" maxW="48">
        <NativeSelect.Field
          id="products-sort"
          value={sortValue}
          onChange={handleChange}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value || "newest"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </HStack>
  );
}
