"use client";

import { motion } from "framer-motion";

type AddLocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddLocationModal({
  isOpen,
  onClose,
}: AddLocationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-[380px] rounded-2xl bg-white p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">새 위치 추가</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 입력 폼 뼈대 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="장소 이름"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="위도"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="경도"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            취소
          </button>
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
            추가
          </button>
        </div>
      </motion.div>
    </div>
  );
}
