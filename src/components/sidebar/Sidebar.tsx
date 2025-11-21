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

      {/* 리스트 뼈대 */}
      <nav className="space-y-2">
        {locations.map(location => {
          const isSelected = selectedId === location.id;

          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelect(location.id)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                isSelected
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="truncate">{location.name}</div>
            </button>
          );
        })}

        {locations.length === 0 && (
          <div className="mt-4 text-xs text-gray-400">
            아직 등록된 위치가 없습니다.
          </div>
        )}
      </nav>
    </aside>
  );
}
