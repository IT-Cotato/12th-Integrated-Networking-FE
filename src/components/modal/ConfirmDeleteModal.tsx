"use client";

import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-[360px] rounded-2xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 text-center text-lg font-semibold">
              정말로 삭제하시겠습니까?
            </div>

            <div className="mb-6 flex flex-col items-center gap-2">
              <WeatherIconDisplay
                weather="storm-night"
                width={80}
                height={80}
              />

              {targetName && (
                <div className="text-sm text-gray-600">{targetName}</div>
              )}
            </div>

            <div className="flex justify-center gap-3">
              <motion.button
                type="button"
                onClick={onCancel}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                취소하기
              </motion.button>
              <motion.button
                type="button"
                onClick={onConfirm}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
              >
                삭제하기
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
