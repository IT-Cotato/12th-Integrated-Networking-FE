"use client";

import { Location } from "@/types/location";

import LocationItem from "./LocationItem";
import SidebarAddButton from "./SidebarAddButton";
import SidebarHeader from "./SidebarHeader";

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
      <SidebarHeader />

      <SidebarAddButton onClickAdd={onClickAdd} />

      <nav className="mt-6 space-y-2">
        {locations.map(location => (
          <LocationItem
            key={location.id}
            location={location}
            isSelected={selectedId === location.id}
            onSelect={onSelect}
            onTogglePin={onTogglePin}
            onDelete={onClickDelete}
          />
        ))}

        {locations.length === 0 && (
          <div className="mt-4 text-xs text-gray-400">
            아직 등록된 위치가 없습니다.
          </div>
        )}
      </nav>
    </aside>
  );
}
