"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

export interface FilterComboboxConfig<T> {
  /** URL search param key (e.g. "publishers", "creators", "genres", "platforms") */
  paramKey: string;
  /** Label above the combobox (e.g. "Filter by publisher") */
  label: string;
  /** Placeholder when none selected (e.g. "All publishers") */
  placeholderAll: string;
  /** Search input placeholder (e.g. "Search publishers…") */
  placeholderSearch: string;
  /** Message when no items match search (e.g. "No publisher found.") */
  emptyMessage: string;
  /** Unique id for the item (React keys, Combobox value identity) */
  getItemId: (item: T) => string;
  /** Value stored in URL param and sent to API (often slug or id) */
  getItemParamValue: (item: T) => string;
  /** Display label for the item (e.g. item.name) */
  getItemLabel: (item: T) => string;
}

export interface FilterComboboxProps<T> {
  items: T[];
  config: FilterComboboxConfig<T>;
}

export function FilterCombobox<T>({ items, config }: FilterComboboxProps<T>) {
  const {
    paramKey,
    label,
    placeholderAll,
    placeholderSearch,
    emptyMessage,
    getItemId,
    getItemParamValue,
    getItemLabel,
  } = config;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const anchorRef = useComboboxAnchor();

  const paramValue = searchParams.get(paramKey) ?? "";
  const selectedParamValues = paramValue
    ? paramValue
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const selectedItems = items.filter((item) =>
    selectedParamValues.includes(getItemParamValue(item))
  );

  const handleValueChange = (value: T[] | null) => {
    const next = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      next.set(paramKey, value.map(getItemParamValue).join(","));
    } else {
      next.delete(paramKey);
    }
    next.delete("page");
    startTransition(() => {
      router.push(`/games?${next.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Combobox<T, true>
        items={items}
        multiple
        value={selectedItems}
        onValueChange={handleValueChange}
        itemToStringLabel={getItemLabel}
        itemToStringValue={getItemId}
        isItemEqualToValue={(a, b) => getItemId(a) === getItemId(b)}
        autoHighlight={true}
      >
        <div
          ref={anchorRef}
          className="w-full max-w-md data-pending:pointer-events-none data-pending:opacity-70"
          data-pending={isPending ? "" : undefined}
        >
          <ComboboxChips>
            <ComboboxValue placeholder={placeholderAll}>
              {(selected: T[]) =>
                selected.map((item) => (
                  <ComboboxChip key={getItemParamValue(item)}>
                    {getItemLabel(item)}
                  </ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxChipsInput placeholder={placeholderSearch} />
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={getItemParamValue(item)} value={item}>
                {getItemLabel(item)}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
