"use client";

import RedPin from "@/assets/icons/pin-red.svg";
import WhitePin from "@/assets/icons/pin-white.svg";
import TrashCan from "@/assets/icons/trash-can.svg";

import { Location } from "@/types/location";

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
      className={`group flex items-center justify-between rounded-3xl px-4 py-2 text-sm ${
        isSelected
          ? "bg-gray-10 text-gray-900"
          : "bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {/* 왼쪽: 핀 + 이름 */}
      <button
        type="button"
        onClick={() => onSelect(location.id)}
        className="flex flex-1 items-center gap-3 text-left"
      >
        <span
          onClick={e => {
            e.stopPropagation();
            onTogglePin(location.id);
          }}
          className="flex items-center justify-center"
        >
          {location.isPinned ? (
            <RedPin className="h-[20px] w-[20px]" />
          ) : (
            <WhitePin className="h-[20px] w-[20px]" />
          )}
        </span>

        <span className="truncate">{location.name}</span>
      </button>

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={() => onDelete(location.id)}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      >
        <TrashCan className="h-[20px] w-[20px]" />
      </button>
    </div>
  );
}
