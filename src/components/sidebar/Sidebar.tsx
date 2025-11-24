"use client";

import MapPin from "@/assets/icons/map-pin.svg";
import RedPin from "@/assets/icons/pin-red.svg";
import WhitePin from "@/assets/icons/pin-white.svg";
import TrashCan from "@/assets/icons/trash-can.svg";

import { Location } from "@/types/location";

type SidebarProps = {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClickAdd: () => void;
  onClickDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export default function Sidebar({
  locations,
  selectedId,
  onSelect,
  onClickAdd,
  onClickDelete,
  onTogglePin,
}: SidebarProps) {
  return (
    <aside className="h-screen w-64 border-r border-gray-200 bg-white px-6 py-8">
      {/* 상단 헤더 */}
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

      {/* 위치 리스트 */}
      <nav className="space-y-2">
        {locations.map(location => {
          const isSelected = selectedId === location.id;

          return (
            <div
              key={location.id}
              className={`group flex items-center justify-between rounded-3xl px-4 py-2 text-sm ${
                isSelected
                  ? "bg-gray-10 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {/* 왼쪽: 핀 + 이름 (행 전체 클릭 시 선택) */}
              <button
                type="button"
                onClick={() => onSelect(location.id)}
                className="flex flex-1 items-center gap-3 text-left"
              >
                <span
                  onClick={event => {
                    event.stopPropagation(); // 행 선택 이벤트 막기
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

              {/* 오른쪽: hover 시 보이는 삭제 버튼 */}
              <button
                type="button"
                onClick={() => onClickDelete(location.id)}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <TrashCan className="h-[20px] w-[20px]" />
              </button>
            </div>
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
