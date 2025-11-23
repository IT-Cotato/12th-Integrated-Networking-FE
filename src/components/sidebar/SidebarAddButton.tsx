"use client";

type Props = {
  onClickAdd: () => void;
};

export default function SidebarAddButton({ onClickAdd }: Props) {
  return (
    <button
      type="button"
      onClick={onClickAdd}
      className="flex items-center gap-2 text-sm text-blue-500"
    >
      <span className="rounded-full bg-gray-100 px-2 py-1 text-base">＋</span>
      <span>추가하기</span>
    </button>
  );
}
