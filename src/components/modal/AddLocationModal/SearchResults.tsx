"use client";

import CheckIcon from "@/assets/icons/check.svg";

import type { SearchResult } from "@/types/search";

type SearchResultsProps = {
  results: SearchResult[];
  selectedIndex: number | null;
  onSelect: (index: number, item: SearchResult) => void;
};

export default function SearchResults({
  results,
  selectedIndex,
  onSelect,
}: SearchResultsProps) {
  return (
    <div className="border-gray-40 flex h-[240px] w-full flex-col items-start gap-4 overflow-y-auto rounded-lg border px-4 py-2">
      {results.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <button
            key={`${item.name}-${item.lat}-${item.lng}`}
            type="button"
            onClick={() => onSelect(index, item)}
            className="border-gray-40 w-full border-b px-4 py-3 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-60 font-medium">{item.name}</div>
                <div className="text-gray-40 text-xs">{item.address}</div>
              </div>

              {isSelected && <CheckIcon className="text-gray-60 h-4 w-4" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
