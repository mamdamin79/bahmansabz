"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface PaginationComponentProps {
  page: number;
  total: number;
  pageSize: number;
  basePath: string;
  params?: Record<string, string>;
}

function buildHref(
  basePath: string,
  page: number,
  params?: Record<string, string>,
): string {
  const search = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
  }
  if (page > 1) search.set("page", String(page));
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function PaginationComponent({
  page,
  total,
  pageSize,
  basePath,
  params,
}: PaginationComponentProps) {
  const router = useRouter();

  return (
    <Pagination.Root
      count={total}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => router.push(buildHref(basePath, e.page, params))}
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
