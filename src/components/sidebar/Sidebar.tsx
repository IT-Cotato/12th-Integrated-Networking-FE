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
    <aside className="h-screen w-64 border-r border-gray-200 bg-white px-6 py-8">
      <SidebarHeader onClickAdd={onClickAdd} />

      <LocationList
        locations={locations}
        selectedId={selectedId}
        onSelect={onSelect}
        onDelete={onClickDelete}
        onTogglePin={onTogglePin}
      />
    </aside>
  );
}
