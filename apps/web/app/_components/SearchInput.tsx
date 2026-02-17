"use client";

import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

interface SearchInputProps {
  basePath: string;
  defaultValue?: string;
  placeholder?: string;
  params?: Record<string, string>;
}

function buildHref(
  basePath: string,
  q: string,
  params?: Record<string, string>
): string {
  const search = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
  }
  if (q) search.set("q", q);
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function SearchInput({
  basePath,
  defaultValue = "",
  placeholder = "Search…",
  params,
}: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const navigate = useCallback(
    (q: string) => {
      router.push(buildHref(basePath, q, params));
    },
    [router, basePath, params]
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
    <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: 0 }}>
      <Input
        name="q"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxW={{ sm: "xs" }}
        w="full"
        aria-label={placeholder}
      />
    </form>
  );
}
