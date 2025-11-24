"use client";

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
    <div className="max-h-56 overflow-y-auto rounded-2xl border border-gray-200">
      {results.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <button
            key={`${item.name}-${item.lat}-${item.lng}`}
            type="button"
            onClick={() => onSelect(index, item)}
            className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm ${
              isSelected
                ? "bg-gray-200"
                : "bg-white hover:bg-[#F8FAFC] active:bg-gray-200"
            } ${
              index !== results.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div>
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500">{item.address}</div>
            </div>
            {isSelected && (
              <span className="text-base text-emerald-500">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
