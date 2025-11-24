"use client";

type Props = {
  onClose: () => void;
};

export default function Header({ onClose }: Props) {
  return (
    <div className="flex items-center justify-between pb-4">
      <span className="text-lg font-semibold">위치 추가</span>
      <button
        onClick={onClose}
        className="text-xl text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  );
}
