"use client";

import { Box, Table } from "@chakra-ui/react";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export type SortOrder = "asc" | "desc";

interface TableSortHeaderProps {
  label: string;
  sortKey: string;
  currentSortBy: string | undefined;
  currentOrder: SortOrder | undefined;
  basePath: string;
  params?: Record<string, string>;
}

function buildSortHref(
  basePath: string,
  sortKey: string,
  currentSortBy: string | undefined,
  currentOrder: SortOrder | undefined,
  params?: Record<string, string>
): string {
  const search = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
  }
  // Cycle: unsorted → asc → desc → unsorted
  const isThisColumn = currentSortBy === sortKey;
  if (!isThisColumn || currentOrder === undefined) {
    search.set("sortBy", sortKey);
    search.set("order", "asc");
  } else if (currentOrder === "asc") {
    search.set("sortBy", sortKey);
    search.set("order", "desc");
  } else {
    // currentOrder === "desc" → third click: clear sort (do not set sortBy/order)
  }
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

const iconSize = 14;

export function TableSortHeader({
  label,
  sortKey,
  currentSortBy,
  currentOrder,
  basePath,
  params,
}: TableSortHeaderProps) {
  const isActive = currentSortBy === sortKey;
  const order = isActive ? currentOrder : undefined;

  return (
    <Table.ColumnHeader>
      <Box
        asChild
        cursor="pointer"
        userSelect="none"
        outline="none"
        whiteSpace="nowrap"
      >
        <Link
          href={buildSortHref(basePath, sortKey, currentSortBy, currentOrder, params)}
        >
          <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            gap={1.5}
          >
            {label}
            <Box as="span" display="inline-flex" alignItems="center" aria-hidden>
              {order === "asc" && <ChevronUp size={iconSize} strokeWidth={2} />}
              {order === "desc" && <ChevronDown size={iconSize} strokeWidth={2} />}
              {!order && <ArrowUpDown size={iconSize} strokeWidth={2} />}
            </Box>
          </Box>
        </Link>
      </Box>
    </Table.ColumnHeader>
  );
}
