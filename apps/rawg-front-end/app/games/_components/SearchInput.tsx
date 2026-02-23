"use client";

import { useSearchParams } from "next/navigation";
import { SearchInput as SharedSearchInput } from "@/components/search-input";

export function SearchInput() {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("search") ?? "";

  return (
    <div>
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
