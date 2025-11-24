"use client";

import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { searchPlaces } from "@/apis/kakao";

export type SearchResult = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

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
