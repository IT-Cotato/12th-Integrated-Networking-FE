"use client";

import { motion } from "framer-motion";

import { WeatherIconDisplay } from "@/components/home/WeatherIconDisplay";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  targetName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  isOpen,
  targetName,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(41,46,46,0.40)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="section-shadow bg-gray-0 w-[360px] rounded-2xl p-6"
      >
        <div className="text-gray-60 mb-4 text-center text-lg font-semibold">
          정말로 삭제하시겠습니까?
        </div>

        <div className="mb-6 flex flex-col items-center gap-2">
          <WeatherIconDisplay weather="storm-night" width={80} height={80} />
          {targetName && (
            <div className="text-gray-60 text-sm">{targetName}</div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="border-gray-20 text-gray-60 hover:bg-gray-10 rounded-lg border px-4 py-2 text-sm"
          >
            취소하기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-gray-0 hover:bg-gray-60 rounded-lg bg-gray-100 px-4 py-2 text-sm"
          >
            삭제하기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
