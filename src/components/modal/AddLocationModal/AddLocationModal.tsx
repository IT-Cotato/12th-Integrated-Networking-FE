"use client";

import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { searchPlaces } from "@/apis/kakao";

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
    if (!name || !lat || !lng) {
      alert("장소 이름, 위도, 경도를 모두 선택해주세요.");
      return;
    }

    const latNum = Number(lat);
    const lngNum = Number(lng);

    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      alert("위도/경도 형식이 잘못됐어요.");
      return;
    }

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
        {/* 헤더 (해 + 제목 + X 버튼) */}
        <Header onClose={handleClose} />

        {/* 검색 인풋 영역 (밑줄 스타일) */}
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
              onSelect={(index, item) => {
                setSelectedIndex(index);
                setName(item.name);
                setLat(String(item.lat));
                setLng(String(item.lng));
                setAddress(item.address);
              }}
            />
          )}
        </div>

        {/* 확인 버튼 (우측 정렬) */}
        <ConfirmButton disabled={isConfirmDisabled} onClick={handleConfirm} />
      </div>
    </div>
  );
}
