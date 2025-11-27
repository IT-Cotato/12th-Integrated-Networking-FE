"use client";

import RedPin from "@/assets/icons/pin-red.svg";
import WhitePin from "@/assets/icons/pin-white.svg";
import TrashCan from "@/assets/icons/trash-can.svg";

import type { Location } from "@/types/location";

type Props = {
  location: Location;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export default function LocationListItem({
  location,
  isSelected,
  onSelect,
  onDelete,
  onTogglePin,
}: Props) {
  return (
    <div
      className={`group flex items-center justify-between rounded-[999px] px-4 py-2 text-sm ${
        isSelected
          ? "bg-gray-10 text-gray-60 shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
          : "bg-gray-0 text-gray-60 hover:bg-gray-10"
      }`}
    >
      {/* 왼쪽: 핀 + 이름 (전체 클릭하면 선택) */}
      <button
        type="button"
        onClick={() => onSelect(location.id)}
        className="flex flex-1 items-center gap-3 text-left"
      >
        {/* 핀 아이콘 (클릭 시 고정 토글, 이벤트 버블링 막기) */}
        <span
          onClick={e => {
            e.stopPropagation();
            onTogglePin(location.id);
          }}
          className="flex items-center justify-center"
        >
          {location.isPinned ? (
            <RedPin className="h-5 w-5" />
          ) : (
            <WhitePin className="h-5 w-5" />
          )}
        </span>

        {/* 위치 이름 */}
        <span className="truncate">{location.name}</span>
      </button>

      {/* 오른쪽: 삭제 버튼 (hover 시만 노출) */}
      <button
        type="button"
        onClick={() => onDelete(location.id)}
        className="ml-2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <TrashCan className="h-5 w-5" />
      </button>
    </div>
  );
}
