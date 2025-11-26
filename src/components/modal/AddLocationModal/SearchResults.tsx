"use client";

import CheckIcon from "@/assets/icons/check.svg";

type SearchResult = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

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
            className={`flex w-full flex-col items-start gap-1 px-3 py-2 text-left text-sm transition-colors ${index !== results.length - 1 ? "border-gray-40 border-b" : ""} `}
          >
            <div className="flex w-full items-center justify-between">
              <div>
                <div className="text-gray-60 font-medium">{item.name}</div>
                <div className="text-gray-40 text-xs">{item.address}</div>
              </div>

              {isSelected && (
                <span className="text-base text-emerald-500">
                  <CheckIcon />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
