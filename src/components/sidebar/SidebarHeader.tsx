"use client";

import MapPin from "@/assets/icons/map-pin.svg";

type Props = {
  onClickAdd: () => void;
};

export default function SidebarHeader({ onClickAdd }: Props) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <MapPin className="h-[30px] w-[30px]" />
        <span>위치 목록</span>
      </div>

      <button
        type="button"
        onClick={onClickAdd}
        className="flex items-center gap-2 text-sm text-blue-500"
      >
        <span className="rounded-full px-2 py-1 text-base">＋</span>
        <span>추가하기</span>
      </button>
    </div>
  );
}
