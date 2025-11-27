"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface SidebarProps {
  locations: Location[];
  selectedLocation: string | null;
  onLocationClick: (id: string) => void;
  onAddClick: () => void;
  onDeleteClick: (id: string, e: React.MouseEvent) => void;
}

export default function Sidebar({
  locations,
  selectedLocation,
  onLocationClick,
  onAddClick,
  onDeleteClick,
}: SidebarProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <aside className="w-[248px] h-full bg-white rounded-tr-[48px] rounded-br-[48px] pt-12 pr-4 pb-12 pl-4 flex flex-col gap-10 shadow-lg">
      {/* 위치 목록 타이틀 */}
      <div className="flex items-center gap-2 px-4">
        <img
          src="/map-pin-front-color.svg"
          alt="위치 목록"
          className="w-5 h-5"
        />
        <h1 className="font-bold text-[20px] text-[#292E2E]">위치 목록</h1>
      </div>

      {/* 추가하기 버튼 */}
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 text-[#292E2E] hover:bg-[#F6F6F6] rounded-lg transition-colors"
      >
        <img
          src="/plus-front-clay.svg"
          alt="추가"
          className="w-[40px] h-[40px]"
        />
        <span className="text-[20px] font-bold">추가하기</span>
      </button>

      {/* 위치 목록 */}
      <nav className="flex flex-col gap-2">
        {locations.length === 0 ? (
          <p className="text-center text-[#A4A4A4] text-xs mt-4 px-4">
            위치를 추가해주세요
          </p>
        ) : (
          locations.map((location) => (
            <div
              key={location.id}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <button
                onClick={() => onLocationClick(location.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  selectedLocation === location.id
                    ? "bg-[#F6F6F6] text-[#292E2E] font-medium"
                    : "hover:bg-[#F2F2F2] text-[#292E2E]"
                }`}
              >
                <img
                  src="/pin-front-clay.svg"
                  alt=""
                  className="w-4 h-4 opacity-50 flex-shrink-0"
                />
                <span className="text-sm flex-1 truncate">{location.name}</span>

                {/* hover 시 쓰레기통 아이콘, 선택 시 핀 아이콘 표시 */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {hoveredLocation === location.id ? (
                      <motion.div
                        key="trash"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteClick(location.id, e);
                        }}
                        className="w-full h-full flex items-center justify-center rounded hover:bg-[#FFCCCC] cursor-pointer transition-colors"
                      >
                        <img
                          src="/trash-can-front-color.svg"
                          alt="삭제"
                          className="width 24px height 24px"
                        />
                      </motion.div>
                    ) : selectedLocation === location.id ? (
                      <motion.div
                        key="pin"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src="/map-pin-front-color.svg"
                          alt="선택됨"
                          className="w-4 h-4"
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}
