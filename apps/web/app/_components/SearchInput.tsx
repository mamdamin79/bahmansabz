"use client";

import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface SearchInputProps {
  basePath: string;
  defaultValue?: string;
  placeholder?: string;
  params?: Record<string, string>;
}

export function SearchInput({
  basePath,
  defaultValue = "",
  placeholder = "Search…",
  params,
}: SearchInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputRef.current?.value?.trim() ?? "";
    const search = new URLSearchParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value) search.set(key, value);
      }
    }
    if (q) search.set("q", q);
    const query = search.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: 0 }}>
      <Input
        ref={inputRef}
        name="q"
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxW={{ sm: "xs" }}
        w="full"
        aria-label={placeholder}
      />
    </form>
  );
}
