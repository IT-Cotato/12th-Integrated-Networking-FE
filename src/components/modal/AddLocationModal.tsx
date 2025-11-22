"use client";

import { useState } from "react";

import { motion } from "framer-motion";

type SearchResult = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type AddLocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddLocationModal({
  isOpen,
  onClose,
}: AddLocationModalProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // 실제로 서버 연동되면 이 name/lat/lng 값을 사용해서 Sidebar에 추가할 예정
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  if (!isOpen) return null;

  // TODO: 나중에 카카오 검색 API 붙일 자리 (지금은 더미)
  const handleDummySearch = () => {
    if (!keyword.trim()) return;

    // 일단은 더미 데이터로 UI만 확인
    setResults([
      {
        name: `${keyword} 예시 장소`,
        address: "서울 어딘가",
        lat: 37.5,
        lng: 127.0,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-[380px] rounded-2xl bg-white p-6 shadow-lg"
      >
        {/* 헤더 */}
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

        {/* 장소 검색 영역 */}
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="장소 검색 (예: 강남역)"
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleDummySearch}
              className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white"
            >
              검색
            </button>
          </div>

          {results.length > 0 && (
            <div className="max-h-40 overflow-y-auto rounded-lg border">
              {results.map(item => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setName(item.name);
                    setLat(String(item.lat));
                    setLng(String(item.lng));
                    setResults([]);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.address}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 입력 폼 영역 */}
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="장소 이름"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="text"
            value={lat}
            onChange={e => setLat(e.target.value)}
            placeholder="위도"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="text"
            value={lng}
            onChange={e => setLng(e.target.value)}
            placeholder="경도"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            onClick={() => {
              // TODO: 여기서 나중에 Home으로 위치 추가 전달
              console.log("추가", { name, lat, lng });
              onClose();
            }}
          >
            추가
          </button>
        </div>
      </motion.div>
    </div>
  );
}
