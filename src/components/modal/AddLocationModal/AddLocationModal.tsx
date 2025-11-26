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
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgba(41,46,46,0.40)]"
      onClick={handleClose} // ← 바깥 클릭 시 종료
    >
      {/* 모달 컨테이너 */}
      <div
        className="section-shadow bg-gray-0 relative flex w-[624px] flex-col items-start gap-12 rounded-2xl px-[72px] py-9"
        onClick={e => e.stopPropagation()} // ← 내부 클릭 이벤트 버블링 방지
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-[16.5px] right-4"
          aria-label="닫기"
        >
          <CloseIcon className="text-gray-60 h-6 w-6" />
        </button>

        {/* 헤더 */}
        <div className="flex w-[480px] items-center gap-4">
          <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center">
            <WeatherIconDisplay weather="sun" width={80} height={80} />
          </div>

          <p className="text-gray-60 text-[32px] leading-none font-bold">
            날씨 위치 추가
          </p>
        </div>

        {/* 검색 인풋 */}
        <SearchInput
          keyword={keyword}
          onChange={setKeyword}
          onSearch={handleSearch}
        />

        {/* 검색 결과 */}
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

        {/* 확인 버튼 */}
        <div className="flex w-full justify-end">
          <ConfirmButton disabled={isConfirmDisabled} onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
