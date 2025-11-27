"use client";

import { Location } from "@/types/location";

import LocationList from "./LocationList";
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
    <aside className="bg-gray-0 section-shadow flex h-[1200px] w-[248px] shrink-0 flex-col items-start gap-10 rounded-r-[48px] px-4 py-12">
      <SidebarHeader onClickAdd={onClickAdd} />

      <div className="w-full px-4">
        <LocationList
          locations={locations}
          selectedId={selectedId}
          onSelect={onSelect}
          onDelete={onClickDelete}
          onTogglePin={onTogglePin}
        />
      </div>
    </aside>
  );
}
