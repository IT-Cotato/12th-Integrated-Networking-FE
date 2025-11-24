"use client";

import SearchIcon from "@/assets/icons/search.svg";

type SearchInputProps = {
  keyword: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchInput({
  keyword,
  onChange,
  onSearch,
}: SearchInputProps) {
  return (
    <div className="border-gray-20 flex w-full items-center gap-3 border-b pb-3">
      <input
        value={keyword}
        onChange={e => onChange(e.target.value)}
        className="text-body-sm text-gray-60 placeholder:text-gray-40 flex-1 bg-transparent outline-none"
        placeholder="키워드를 입력하세요"
      />
      <button
        type="button"
        onClick={onSearch}
        className="text-gray-60 flex h-6 w-6 items-center justify-center hover:text-gray-100"
        aria-label="검색"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
