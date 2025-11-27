"use client";

import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { searchPlaces } from "@/apis/kakao";

import type { SearchResult } from "@/types/search";

export function useAddLocationModal(
  onSubmit: (location: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
  }) => void,
  onClose: () => void,
) {
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
    enabled: false,
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

  const handleSelectItem = (index: number, item: SearchResult) => {
    setSelectedIndex(index);
    setName(item.name);
    setLat(String(item.lat));
    setLng(String(item.lng));
    setAddress(item.address);
  };

  const handleConfirm = () => {
    if (!name || !lat || !lng) {
      console.log("장소 이름, 위도, 경도를 모두 선택해주세요.");
      return;
    }

    const latNum = Number(lat);
    const lngNum = Number(lng);

    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      // alert 대신 콘솔 에러 로그만 남기도록 변경
      console.error("위도/경도 형식이 잘못되었습니다.", { lat, lng });
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

  return {
    keyword,
    setKeyword,
    results,
    isFetching,
    selectedIndex,
    isConfirmDisabled: !name || !lat || !lng,

    handleSearch,
    handleSelectItem,
    handleConfirm,
    handleClose,
  };
}
