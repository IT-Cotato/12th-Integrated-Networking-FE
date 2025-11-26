"use client";

import CloseIcon from "@/assets/icons/close.svg";

import { WeatherIconDisplay } from "@/components/home/WeatherIconDisplay";

import { useAddLocationModal } from "../../../hooks/useAddLocationModal";
import ConfirmButton from "./ConfirmButton";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

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

export default function AddLocationModal({
  isOpen,
  onClose,
  onSubmit,
}: AddLocationModalProps) {
  const {
    keyword,
    setKeyword,
    results,
    selectedIndex,
    isFetching,
    isConfirmDisabled,
    handleSearch,
    handleSelectItem,
    handleConfirm,
    handleClose,
  } = useAddLocationModal(onSubmit, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgba(41,46,46,0.40)]">
      {/* 모달 컨테이너: 624 x 641 / padding 36 72 / gap 48 / bg = gray-0 / radius 16 / shadow util */}
      <div className="section-shadow bg-gray-0 relative flex w-[624px] flex-col items-start gap-12 rounded-2xl px-[72px] py-9">
        {/* 닫기 버튼 (fixed 느낌, 우측 상단) */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-9 right-9"
          aria-label="닫기"
        >
          <CloseIcon className="text-gray-60 h-6 w-6" />
        </button>

        {/* 헤더 영역 : 아이콘 + 텍스트 한 줄 */}
        <div className="flex w-[480px] items-center gap-4">
          {/* 아이콘 컨테이너: 80 x 80, 가운데 정렬 */}
          <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center">
            <WeatherIconDisplay weather="sun" width={80} height={80} />
          </div>

          {/* 타이틀 텍스트: 32px, bold, gray-60 */}
          <p className="text-gray-60 text-[32px] leading-none font-bold">
            날씨 위치 추가
          </p>
        </div>

        {/* 검색 인풋 + 라벨 영역 */}
        <SearchInput
          keyword={keyword}
          onChange={setKeyword}
          onSearch={handleSearch}
        />

        {/* 검색 결과 리스트 영역 */}
        <div className="w-full">
          {isFetching && (
            <div className="text-gray-40 py-4 text-center text-xs">
              검색중입니다...
            </div>
          )}

          {!isFetching && results.length === 0 && keyword && (
            <div className="text-gray-40 py-4 text-center text-xs">
              검색 결과가 없습니다.
            </div>
          )}

          {!isFetching && results.length > 0 && (
            <SearchResults
              results={results}
              selectedIndex={selectedIndex}
              onSelect={handleSelectItem}
            />
          )}
        </div>

        {/* 하단 확인 버튼 (우측 정렬) */}
        <div className="flex w-full justify-end">
          <ConfirmButton disabled={isConfirmDisabled} onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
