"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GamesListParams } from "@/lib/api/model";

const DEFAULT_ORDERING_VALUE = "__default__";

/** Ordering values supported by gamesList (GamesListParams.ordering) */
const ORDERING_OPTIONS: {
  value:
    | NonNullable<GamesListParams["ordering"]>
    | typeof DEFAULT_ORDERING_VALUE;
  label: string;
}[] = [
  { value: DEFAULT_ORDERING_VALUE, label: "Default" },
  { value: "-released", label: "Newest first" },
  { value: "released", label: "Oldest first" },
  { value: "-rating", label: "Highest rating" },
  { value: "rating", label: "Lowest rating" },
  { value: "-metacritic", label: "Highest Metacritic" },
  { value: "metacritic", label: "Lowest Metacritic" },
  { value: "-added", label: "Recently added" },
  { value: "added", label: "Least recently added" },
  { value: "name", label: "Name (A–Z)" },
  { value: "-name", label: "Name (Z–A)" },
  { value: "-updated", label: "Recently updated" },
  { value: "updated", label: "Least recently updated" },
];

export function GamesSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const orderingParam = searchParams.get("ordering") ?? "";
  const ordering =
    orderingParam === "" ? DEFAULT_ORDERING_VALUE : orderingParam;

  const handleValueChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== DEFAULT_ORDERING_VALUE) {
      next.set("ordering", value);
    } else {
      next.delete("ordering");
    }
    next.delete("page");
    startTransition(() => {
      router.push(`/games?${next.toString()}`);
    });
  };

  return (
    <div
      className="flex w-full flex-col gap-2 data-pending:pointer-events-none data-pending:opacity-70"
      data-pending={isPending ? "" : undefined}
    >
      <Label className="text-sm font-medium">Sort by</Label>
      <Select
        value={ordering}
        onValueChange={handleValueChange}
        aria-label="Sort games"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          {ORDERING_OPTIONS.map((opt) => (
            <SelectItem key={opt.label} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
