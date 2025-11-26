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
    <div className="flex w-full flex-col items-start gap-2">
      {/* 라벨: 장소 이름 */}
      <span className="text-gray-60 text-[24px] font-semibold">장소 이름</span>

      {/* 인풋 래퍼: padding 4 8, space-between, border gray-40 */}
      <div className="border-gray-40 flex w-full items-center justify-between border-b px-2 py-1">
        <input
          value={keyword}
          onChange={e => onChange(e.target.value)}
          className="text-gray-60 placeholder:text-gray-40 flex-1 bg-transparent text-sm outline-none"
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
    </div>
  );
}
