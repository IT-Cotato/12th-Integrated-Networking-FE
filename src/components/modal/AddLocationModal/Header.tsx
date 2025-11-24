"use client";

import { WeatherIconDisplay } from "@/components/home/WeatherIconDisplay";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex-1 text-center text-lg font-semibold">
        <div className="mb-2 flex justify-center">
          <WeatherIconDisplay weather="sun" width={56} height={56} />
        </div>
        <div>날씨 위치 추가</div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-2xl leading-none text-gray-400 hover:text-gray-600"
        aria-label="닫기"
      >
        ×
      </button>
    </div>
  );
}
