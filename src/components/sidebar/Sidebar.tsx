"use client";

import MapPin from "@/assets/icons/map-pin.svg";

import { Location } from "@/types/location";

type SidebarProps = {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClickAdd: () => void;
  onClickDelete: (id: string) => void;
};

export default function Sidebar({
  locations,
  selectedId,
  onSelect,
  onClickAdd,
  onClickDelete,
}: SidebarProps) {
  return (
    <aside className="h-screen w-64 border-r border-gray-200 bg-white px-6 py-8">
      {/* 상단 헤더 */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <span className="text-red-500">
            <MapPin />
          </span>
          <span>위치 목록</span>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm text-blue-500"
        >
          <span className="bg-grey-100 rounded-full px-2 py-1 text-base">
            +
          </span>
          <span>추가하기</span>
        </button>
      </div>

      {/* 리스트는 나중에 추가 */}
      <nav>리스트 자리</nav>
    </aside>
  );
}
