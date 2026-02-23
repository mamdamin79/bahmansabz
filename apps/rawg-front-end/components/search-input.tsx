"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Label } from "./ui/label";

export interface SearchInputProps {
  /** Base path for navigation (e.g. "/games") */
  basePath: string;
  /** Initial value from URL or elsewhere */
  defaultValue?: string;
  /** Query param name for the search term (default "q"; use "search" for games) */
  queryParam?: string;
  placeholder?: string;
  /** Extra params to keep in the URL (used when mergeWithSearchParams is false) */
  params?: Record<string, string>;
  /** If true, keep current URL params and only update query param (e.g. preserve filters) */
  mergeWithSearchParams?: boolean;
  /** Param keys to remove when updating search (e.g. ["page"] to go to page 1) */
  paramsToResetOnSearch?: string[];
  /** Optional class name for the input */
  className?: string;
  /** Optional label for the input */
  label?: string;
}

function buildHref(
  basePath: string,
  queryParam: string,
  value: string,
  params?: Record<string, string>
): string {
  const search = new URLSearchParams();
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val) search.set(key, val);
    }
  }
  if (value) search.set(queryParam, value);
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function SearchInput({
  basePath,
  defaultValue = "",
  queryParam = "q",
  placeholder = "Search…",
  params,
  mergeWithSearchParams = false,
  paramsToResetOnSearch,
  label,
  className,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  const navigate = useCallback(
    (q: string) => {
      if (mergeWithSearchParams) {
        const next = new URLSearchParams(searchParams);
        if (q) next.set(queryParam, q);
        else next.delete(queryParam);
        if (paramsToResetOnSearch) {
          for (const key of paramsToResetOnSearch) next.delete(key);
        }
        router.push(`${basePath}?${next.toString()}`);
      } else {
        router.push(buildHref(basePath, queryParam, q, params));
      }
    },
    [
      router,
      basePath,
      queryParam,
      params,
      mergeWithSearchParams,
      paramsToResetOnSearch,
      searchParams,
    ]
  );

  const debouncedNavigate = useDebounceCallback(navigate, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    debouncedNavigate(q.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedNavigate.cancel();
    navigate(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" style={{ flex: 1, minWidth: 0 }}>
      {label && <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</Label>}
      <Input
        name={queryParam}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={className}
        aria-label={placeholder}
      />
    </form>
  );
}
