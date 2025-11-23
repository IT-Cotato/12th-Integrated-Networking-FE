"use client";

import RedPin from "@/assets/icons/pin-red.svg";
import WhitePin from "@/assets/icons/pin-white.svg";
// 핀 색 있는 버전
import TrashCan from "@/assets/icons/trash-can.svg";

import { Location } from "@/types/location";

type Props = {
  location: Location;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function LocationItem({
  location,
  isSelected,
  onSelect,
  onTogglePin,
  onDelete,
}: Props) {
  return (
    <div
      className={`group flex items-center justify-between rounded-3xl px-4 py-2 text-sm ${
        isSelected
          ? "bg-gray-10 text-gray-900"
          : "bg-white text-gray-600 hover:bg-[#F8FAFC]"
      }`}
    >
      {/* 왼쪽: 핀 + 이름 */}
      <button
        type="button"
        onClick={() => onSelect(location.id)}
        className="flex flex-1 items-center gap-3 text-left"
      >
        {location.isPinned ? (
          <RedPin className="h-[18px] w-[18px]" />
        ) : (
          <WhitePin className="h-[18px] w-[18px]" />
        )}
        <span className="truncate">{location.name}</span>
      </button>

      {/* 오른쪽: 삭제 버튼 */}
      <button
        type="button"
        onClick={() => onDelete(location.id)}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      >
        <TrashCan className="h-[18px] w-[18px]" />
      </button>

      {/* 핀 토글 */}
      <button
        type="button"
        onClick={() => onTogglePin(location.id)}
        className="ml-2"
      ></button>
    </div>
  );
}
