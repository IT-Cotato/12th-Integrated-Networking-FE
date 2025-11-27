"use client";

import MapPin from "@/assets/icons/map-pin.svg";
import PlusIcon from "@/assets/icons/plus.svg";

type Props = {
  onClickAdd: () => void;
};

// SidebarHeader.tsx
export default function SidebarHeader({ onClickAdd }: Props) {
  return (
    <div className="flex flex-col items-start gap-10">
      {/* 위치 목록 아이콘 + 텍스트 */}
      <div className="flex items-center gap-4">
        <MapPin className="h-[30px] w-[30px]" />
        <span className="font-pretendard text-gray-60 text-[20px] leading-none font-bold">
          위치 목록
        </span>
      </div>

      {/* 추가하기 버튼 */}
      <button
        type="button"
        onClick={onClickAdd}
        className="flex items-center gap-2"
      >
        <PlusIcon />
        <span className="font-pretendard text-gray-60 text-[20px] leading-none font-semibold">
          추가하기
        </span>
      </button>
    </div>
  );
}
