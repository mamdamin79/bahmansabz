"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

interface GamesPaginationProps {
  currentPage: number;
  totalCount: number;
}

function buildPageHref(searchParams: URLSearchParams, page: number): string {
  const next = new URLSearchParams(searchParams);
  next.set("page", String(page));
  return `/games?${next.toString()}`;
}

/** Show page numbers: first, maybe ellipsis, window around current, maybe ellipsis, last */
function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  pages.push(1);
  if (currentPage > 3) pages.push("ellipsis");
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let p = start; p <= end; p++) {
    if (p !== 1 && p !== totalPages) pages.push(p);
  }
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export function GamesPagination({
  currentPage,
  totalCount,
}: GamesPaginationProps) {
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  const prevHref =
    currentPage > 1 ? buildPageHref(searchParams, currentPage - 1) : undefined;
  const nextHref =
    currentPage < totalPages
      ? buildPageHref(searchParams, currentPage + 1)
      : undefined;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          {prevHref ? (
            <Link
              href={prevHref}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 px-2.5 sm:pl-2.5"
              )}
              aria-label="Go to previous page"
            >
              <ChevronLeftIcon className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 px-2.5 sm:pl-2.5 pointer-events-none opacity-50"
              )}
              aria-disabled
            >
              <ChevronLeftIcon className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </span>
          )}
        </PaginationItem>
        {pageNumbers.map((item, i) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <Link
                href={buildPageHref(searchParams, item)}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium",
                  currentPage === item
                    ? buttonVariants({ variant: "outline", size: "icon" })
                    : buttonVariants({ variant: "ghost", size: "icon" })
                )}
                aria-current={currentPage === item ? "page" : undefined}
              >
                {item}
              </Link>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          {nextHref ? (
            <Link
              href={nextHref}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 px-2.5 sm:pr-2.5"
              )}
              aria-label="Go to next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="size-4" />
            </Link>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 px-2.5 sm:pr-2.5 pointer-events-none opacity-50"
              )}
              aria-disabled
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="size-4" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
