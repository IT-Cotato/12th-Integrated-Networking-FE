"use client";

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
      <div className="w-[480px] rounded-3xl bg-white p-8 shadow-xl">
        <Header onClose={handleClose} />

        <SearchInput
          keyword={keyword}
          onChange={setKeyword}
          onSearch={handleSearch}
        />

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

        <ConfirmButton disabled={isConfirmDisabled} onClick={handleConfirm} />
      </div>
    </div>
  );
}
