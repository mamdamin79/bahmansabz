"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 12;

function buildProductsQuery(params: {
  page: number;
  sortBy?: string;
  order?: string;
  q?: string;
}): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  if (params.sortBy) search.set("sortBy", params.sortBy);
  if (params.order) search.set("order", params.order);
  if (params.q?.trim()) search.set("q", params.q.trim());
  return search.toString();
}

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
    router.push(`/products?${query}`);
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
