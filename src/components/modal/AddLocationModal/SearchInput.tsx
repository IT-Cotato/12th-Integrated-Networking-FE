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
    <div className="mb-6">
      <div className="mb-2 text-sm font-semibold text-gray-800">장소 이름</div>
      <div className="flex items-center border-b border-gray-300 pb-2">
        <input
          type="text"
          value={keyword}
          onChange={e => onChange(e.target.value)}
          placeholder="키워드를 입력하세요"
          className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={onSearch}
          className="ml-2 text-sm text-gray-500 hover:text-gray-800"
        >
          <SearchIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
    </div>
  );
}
