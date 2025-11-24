"use client";

type Result = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type Props = {
  results: Result[];
  onSelect: (item: Result) => void;
};

export default function SearchResults({ results, onSelect }: Props) {
  return (
    <div className="max-h-64 space-y-2 overflow-y-auto">
      {results.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className="w-full rounded-lg bg-white px-4 py-3 text-left hover:bg-[#F8FAFC]"
        >
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">{item.address}</div>
        </button>
      ))}
    </div>
  );
}
