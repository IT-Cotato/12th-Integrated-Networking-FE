"use client";

import MapPin from "@/assets/icons/map-pin.svg";

export default function SidebarHeader() {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <MapPin className="h-[24px] w-[24px]" />
        <span>위치 목록</span>
      </div>
    </div>
  );
}
