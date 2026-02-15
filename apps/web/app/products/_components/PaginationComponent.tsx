"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { buildProductsQuery, productsPath } from "./products-query";

const PAGE_SIZE = 12;

export function PaginationComponent({
  page,
  total,
  pageSize = PAGE_SIZE,
  sortBy,
  order,
  q,
}: {
  page: number;
  total: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  q?: string;
}) {
  const router = useRouter();

  const handlePageChange = (e: { page: number }) => {
    const query = buildProductsQuery({
      page: e.page,
      sortBy,
      order,
      q,
    });
    router.push(productsPath(query));
  };

  return (
    <Pagination.Root
      count={total}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => handlePageChange(e)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <span aria-hidden>‹</span>
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(item) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {item.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Next page">
            <span aria-hidden>›</span>
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}
