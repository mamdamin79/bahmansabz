"use client";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const people = [
  { id: 1, name: "Tom Cook", position: "Designer" },
  { id: 2, name: "Wade Cooper", position: "Designer" },
  { id: 3, name: "Tanya Fox", position: "Engineer" },
  { id: 4, name: "Arlene Mccoy", position: "Engineer" },
  { id: 5, name: "Devon Webb", position: "Product" },
  { id: 6, name: "William Howard", position: "Product" },
  { id: 7, name: "Richard Long", position: "Marketing" },
  { id: 8, name: "Joan Howard", position: "Marketing" },
  { id: 9, name: "Donna Price", position: "HR" },
  { id: 10, name: "Michelle Thompson", position: "HR" },
] as const;

type Person = (typeof people)[number];

export const HeadlessUiCombobox = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Person[]>([people[1]]);

  // 1. Group the people once (O(n) with Map)
  const groupedPeople = useMemo(() => {
    const map = new Map<string, Person[]>();
    for (const person of people) {
      const list = map.get(person.position) ?? [];
      list.push(person);
      map.set(person.position, list);
    }
    return Array.from(map.entries()).map(([label, items]) => ({
      label,
      items,
    }));
  }, []);

  // 2. Filter the groups based on query
  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery === "") return groupedPeople;

    return groupedPeople
      .map((group) => ({
        ...group,
        items: group.items.filter((person) =>
          person.name.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query, groupedPeople]);

  const remove = (id: number) => {
    setSelected((prev) => prev.filter((person) => person.id !== id));
  };

  const clear = () => {
    setSelected([]);
    setQuery("");
  };

  const allFilteredPeople = useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups]
  );

  const selectAllFiltered = () => {
    setSelected((prev) => {
      const byId = new Map(prev.map((p) => [p.id, p]));
      for (const person of allFilteredPeople) byId.set(person.id, person);
      return Array.from(byId.values());
    });
  };

  const allFilteredSelected =
    allFilteredPeople.length > 0 &&
    allFilteredPeople.every((p) =>
      selected.some((s) => s.id === p.id)
    );

  const deselectAllFiltered = () => {
    const filteredIds = new Set(allFilteredPeople.map((p) => p.id));
    setSelected((prev) => prev.filter((p) => !filteredIds.has(p.id)));
  };

  return (
    <div className="relative max-w-md">
      <Combobox
        multiple
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          {/* INPUT CONTAINER */}
          <div
            className={cn(
              "flex flex-wrap relative items-center gap-1 rounded-lg bg-slate-800/5 px-2 py-1.5 pr-20",
              "focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-slate-800/25"
            )}
          >
            {/* CHIPS */}
            {selected.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-1 rounded-md bg-slate-800/10 px-2 py-0.5 text-sm"
              >
                {person.name}
                <button
                  type="button"
                  aria-label={`Remove ${person.name}`}
                  className="p-0.5 rounded cursor-pointer hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/25 focus-visible:ring-inset"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(person.id);
                  }}
                >
                  <XIcon className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}

            {/* INPUT */}
            <ComboboxInput
              className="flex-1 min-w-[80px] border-none bg-transparent p-0 text-sm focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
              displayValue={() => query}
              placeholder={selected.length === 0 ? "Search…" : undefined}
              aria-label="Search and select people"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="absolute flex items-center inset-y-0 right-0 px-2.5 gap-1">
            <span className="text-xs font-medium text-slate-400" aria-hidden>
              {selected.length}
            </span>
            <ComboboxButton
              className="p-1 cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/25 focus-visible:ring-offset-1"
              aria-label="Open options"
            >
              <ChevronDownIcon className="size-4 text-slate-800" />
            </ComboboxButton>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                clear();
              }}
              className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/25 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Clear selection"
              disabled={selected.length === 0}
            >
              <XIcon className="size-4 text-slate-800 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* OPTIONS */}
        <ComboboxOptions
          className={cn(
            "mt-2 rounded-xl border border-slate-800/5 bg-white p-1 pt-0 shadow-lg",
            "max-h-96 overflow-auto [--anchor-gap:8px] z-50"
          )}
        >
          {filteredGroups.length === 0 && query !== "" && (
            <output
              className="px-4 py-2 text-sm text-slate-500 block"
              aria-live="polite"
            >
              No results found.
            </output>
          )}

          {filteredGroups.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                allFilteredSelected ? deselectAllFiltered() : selectAllFiltered();
              }}
              className="flex w-full items-center gap-2 rounded-tl-lg px-3 py-2 text-left text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/25 focus-visible:ring-inset"
              aria-pressed={allFilteredSelected}
              aria-label={
                allFilteredSelected
                  ? "Deselect all filtered results"
                  : "Select all filtered results"
              }
            >
              <CheckIcon
                className={cn(
                  "size-4 shrink-0",
                  allFilteredSelected ? "visible text-slate-800" : "invisible"
                )}
                aria-hidden
              />
              {allFilteredSelected
                ? "Deselect all (filtered)"
                : "Select all (filtered)"}
            </button>
          )}

          {filteredGroups.map((group) => (
            <div key={group.label}>
              <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-white/90 backdrop-blur-sm">
                {group.label}
              </div>

              {group.items.map((person) => (
                <ComboboxOption
                  key={person.id}
                  value={person}
                  className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-slate-100"
                >
                  <CheckIcon className="invisible size-4 group-data-selected:visible text-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      {person.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {person.position}
                    </span>
                  </div>
                </ComboboxOption>
              ))}
            </div>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
