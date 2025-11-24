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
      <div className="bg-gray-0 section-shadow relative flex w-[624px] flex-col items-start gap-12 rounded-2xl px-[72px] py-9 py-18">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-9 right-9"
          aria-label="닫기"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* 헤더 영역 : 해 아이콘 + 제목 */}
        <div className="flex w-full flex-col items-start gap-3">
          <WeatherIconDisplay weather="sun" width={56} height={56} />
          <p className="text-[20px] font-semibold text-gray-100">
            날씨 위치 추가
          </p>
        </div>

        {/* 입력 + 라벨 영역 */}
        <div className="w-full">
          <div className="mb-2 text-sm font-semibold text-gray-100">
            장소 이름
          </div>
          <SearchInput
            keyword={keyword}
            onChange={setKeyword}
            onSearch={handleSearch}
          />
        </div>

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
