"use client";
import {
  Button,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

export const HeadlessUiCombobox = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<
    { id: number; name: string; position: string }[]
  >([people[1]]);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const groupedPeople = Object.values(
    people.reduce(
      (acc, person) => {
        if (!acc[person.position]) {
          acc[person.position] = {
            label: person.position,
            items: [],
          };
        }
        acc[person.position].items.push(person);
        return acc;
      },
      {} as Record<string, { label: string; items: typeof people }>,
    ),
  );

  const filteredGroups = groupedPeople
    .map((group) => ({
      ...group,
      items: group.items.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length > 0);

  const remove = (id: number) => {
    setSelected(selected.filter((person) => person.id !== id));
  };

  const clear = () => {
    setSelected([]);
    setQuery("");
  };

  return (
    <div className="mx-auto relative h-screen max-w-md pt-20">
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
              "flex flex-wrap relative items-center gap-1 rounded-lg bg-slate-800/5 px-2 py-1.5 pr-8",
              "focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-slate-800/25",
            )}
          >
            {/* CHIPS */}
            {selected.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-1 rounded-md bg-slate-800/10 px-2 py-0.5 text-sm"
              >
                {person.name}
                <XIcon
                  className="size-3.5 cursor-pointer"
                  onClick={() => remove(person.id)}
                />
              </div>
            ))}

            {/* INPUT */}
            <ComboboxInput
              as="input"
              className="flex-1 min-w-[80px] border-none bg-transparent p-0 text-sm focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>

          {/* BUTTON */}

          <div className="absolute flex items-center inset-y-0 right-0 px-2.5">
            <span className="text-sm text-slate-800/20">{selected.length}</span>
            <ComboboxButton>
              <ChevronDownIcon className="size-4 text-slate-800" />
            </ComboboxButton>
            <Button onMouseDown={clear}>
              <XIcon className="size-4 cursor-pointer text-slate-800" />
            </Button>
          </div>
        </div>

        {/* OPTIONS */}
        {/* <ComboboxOptions
          anchor="bottom"
          className={cn(
            "absolute left-0 right-0 w-[28rem] max-w-full mt-2 rounded-xl border border-slate-800/5 bg-white p-1",
            "max-h-60 overflow-auto",
          )}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-slate-100"
            >
              <CheckIcon className="invisible size-4 group-data-selected:visible" />
              <div className="text-sm">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions> */}

        <ComboboxOptions
          anchor="bottom"
          className={cn(
            "absolute left-0 right-0 w-[28rem] max-w-full mt-2 rounded-xl border border-slate-800/5 bg-white p-1",
            "max-h-60 overflow-auto",
          )}
        >
          {filteredGroups.map((group) => (
            <div key={group.label} className="mb-2">
              {/* GROUP HEADER */}
              <div className="sticky top-0 z-10 px-3 py-1 text-xs font-medium text-slate-500 bg-white">
                {group.label}
              </div>

              {/* ITEMS */}
              {group.items.map((person) => (
                <ComboboxOption
                  key={person.id}
                  value={person}
                  className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-slate-100"
                >
                  <CheckIcon className="invisible size-4 group-data-selected:visible" />
                  <div className="flex flex-col">
                    <span className="text-sm">{person.name}</span>
                    <span className="text-xs text-slate-400">
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
