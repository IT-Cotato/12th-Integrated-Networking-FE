"use client";

import { motion } from "framer-motion";

type ConfirmButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export default function ConfirmButton({
  disabled,
  onClick,
}: ConfirmButtonProps) {
  return (
    <div className="flex justify-end">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.03 } : undefined}
        whileTap={!disabled ? { scale: 0.97 } : undefined}
        className={`h-10 rounded-lg px-6 text-sm font-medium text-white ${
          disabled
            ? "cursor-not-allowed bg-gray-300"
            : "hover:bgブラック bg-gray-900"
        }`}
      >
        확인
      </motion.button>
    </div>
  );
}
