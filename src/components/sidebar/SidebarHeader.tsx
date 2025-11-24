"use client";

import { motion } from "framer-motion";

import MapPin from "@/assets/icons/map-pin.svg";

type Props = {
  onClickAdd: () => void;
};

export default function SidebarHeader({ onClickAdd }: Props) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <MapPin className="h-[30px] w-[30px]" />
        <span>위치 목록</span>
      </div>

      <motion.button
        type="button"
        onClick={onClickAdd}
        className="flex items-center gap-2 text-sm text-blue-500"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="rounded-full px-2 py-1 text-base">＋</span>
        <span>추가하기</span>
      </motion.button>
    </div>
  );
}
