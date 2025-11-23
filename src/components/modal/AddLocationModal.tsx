"use client";

import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

// 돋보기 아이콘
import { searchPlaces } from "@/apis/kakao";

// 상단 아이콘 (원하는 걸로 교체)
import SearchIcon from "@/assets/icons/search.svg";

import SunCloud from "../../../public/weather/sun.svg";

type AddLocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (location: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
  }) => void;
};

type SearchResult = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export default function AddLocationModal({
  isOpen,
  onClose,
  onSubmit,
}: AddLocationModalProps) {
  const queryClient = useQueryClient();

  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const {
    data: results = [],
    refetch,
    isFetching,
  } = useQuery<SearchResult[]>({
    queryKey: ["kakao-search", keyword],
    queryFn: () => searchPlaces(keyword),
    enabled: false, // 검색 버튼 눌렀을 때만 호출
  });

  const resetForm = () => {
    setKeyword("");
    setName("");
    setLat("");
    setLng("");
    setAddress("");
    setSelectedIndex(null);
    queryClient.removeQueries({ queryKey: ["kakao-search"] });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    refetch();
  };

  const handleConfirm = () => {
    if (!name || !lat || !lng) return;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) return;

    onSubmit({
      name,
      lat: latNum,
      lng: lngNum,
      address,
    });

    handleClose();
  };

  const isConfirmDisabled = !name || !lat || !lng;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[480px] rounded-3xl bg-white p-8 shadow-xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex-1 text-center text-lg font-semibold">
            <div className="mb-2 flex justify-center">
              <SunCloud className="h-[56px] w-[56px]" />
            </div>
            <div>날씨 위치 추가</div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {/* 입력 영역 */}
        <div className="mb-6">
          <div className="mb-2 text-sm font-semibold text-gray-800">
            장소 이름
          </div>
          <div className="flex items-center border-b border-gray-300 pb-2">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="키워드를 입력하세요"
              className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="ml-2 text-gray-500 hover:text-gray-800"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 검색 결과 리스트 */}
        <div className="mb-8">
          {isFetching && (
            <div className="py-4 text-center text-xs text-gray-500">
              검색중입니다...
            </div>
          )}

          {!isFetching && results.length === 0 && keyword && (
            <div className="py-4 text-center text-xs text-gray-400">
              검색 결과가 없습니다.
            </div>
          )}

          {!isFetching && results.length > 0 && (
            <div className="max-h-56 overflow-y-auto rounded-2xl border border-gray-200">
              {results.map((item, index) => {
                const isSelected = selectedIndex === index;

                return (
                  <button
                    key={`${item.name}-${item.lat}-${item.lng}`}
                    type="button"
                    onClick={() => {
                      setSelectedIndex(index);
                      setName(item.name);
                      setLat(String(item.lat));
                      setLng(String(item.lng));
                      setAddress(item.address);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-gray-200"
                        : "bg-white hover:bg-[#F8FAFC] active:bg-gray-200"
                    } ${index !== results.length - 1 ? "border-b border-gray-200" : ""} `}
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.address}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-base text-emerald-500">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={`h-10 rounded-lg px-6 text-sm font-medium text-white ${
              isConfirmDisabled
                ? "cursor-not-allowed bg-gray-300"
                : "bg-gray-900 hover:bg-black"
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
