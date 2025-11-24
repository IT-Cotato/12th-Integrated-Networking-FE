"use client";

type Props = {
  keyword: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchInput({ keyword, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2 pb-4">
      <input
        value={keyword}
        onChange={e => onChange(e.target.value)}
        className="flex-1 rounded-md border px-3 py-2"
        placeholder="장소 이름을 입력하세요"
      />
      <button
        type="button"
        onClick={onSearch}
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        검색
      </button>
    </div>
  );
}
