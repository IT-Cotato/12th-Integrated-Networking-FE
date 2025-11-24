"use client";

import CloseIcon from "@/assets/icons/close.svg";

import { useAddLocationModal } from "../../../hooks/useAddLocationModal";
import ConfirmButton from "./ConfirmButton";
import Header from "./Header";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* 모달 박스를 relative로 만들어서 닫기 버튼 absolute 기준을 여기로 */}
      <div className="relative w-[480px] rounded-3xl bg-white p-8 shadow-xl">
        {/* 우측 상단 고정 닫기 버튼 */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* 헤더 영역 (제목 등) */}
        <Header />

        {/* 검색 인풋 영역 */}
        <SearchInput
          keyword={keyword}
          onChange={setKeyword}
          onSearch={handleSearch}
        />

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
            <SearchResults
              results={results}
              selectedIndex={selectedIndex}
              onSelect={handleSelectItem}
            />
          )}
        </div>

        {/* 확인 버튼 */}
        <ConfirmButton disabled={isConfirmDisabled} onClick={handleConfirm} />
      </div>
    </div>
  );
}
