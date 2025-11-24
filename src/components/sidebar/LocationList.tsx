"use client";

import { Location } from "@/types/location";

import LocationListItem from "./LocationListItem";

type Props = {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export default function LocationList({
  locations,
  selectedId,
  onSelect,
  onDelete,
  onTogglePin,
}: Props) {
  return (
    <nav className="space-y-2">
      {locations.map(location => (
        <LocationListItem
          key={location.id}
          location={location}
          isSelected={selectedId === location.id}
          onSelect={onSelect}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />
      ))}

      {locations.length === 0 && (
        <div className="mt-4 text-xs text-gray-400">
          아직 등록된 위치가 없습니다.
        </div>
      )}
    </nav>
  );
}
