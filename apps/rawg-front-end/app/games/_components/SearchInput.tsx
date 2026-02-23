"use client";

import { SearchInput as SharedSearchInput } from "@/components/search-input";
import { useSearchParams } from "next/navigation";

export function SearchInput() {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("search") ?? "";

  return (
    <div className="mt-4">
      <SharedSearchInput
        basePath="/games"
        queryParam="search"
        defaultValue={defaultValue}
        placeholder="Search..."
        className="w-full max-w-md"
        mergeWithSearchParams
        paramsToResetOnSearch={["page"]}
        label="Search games"
      />
    </div>
  );
}
