import { DayClouds } from "../img/DayClouds.tsx";
import tickFrontColor from "../../assets/img/tick-front-color.png";
import zoomFrontColor from "../../assets/img/zoom-front-color.png";
import multiply from "../../assets/icon/multiply.svg";
import Input from "../html/Input.tsx";
import Button from "../html/Button.tsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { KakaoPlace } from "../../types/kakao.d.ts";

interface AddModalProps {
  onCancel: () => void;
  onConfirm: (selectedPlace: KakaoPlace | null) => void;
}

export default function AddModal({ onCancel, onConfirm }: AddModalProps) {
  const [selectedId, setSelectedId] = useState<string>("1");

  const [query, setQuery] = useState("");

  const REST_API_KEY = "d8576c24da12ab6f950e9c029f171d8b";

  const { data, isLoading, isError, refetch } = useQuery<KakaoPlace[]>({
    queryKey: ["kakaoSearch", query],
    queryFn: async () => {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
          },
        }
      );

      if (!res.ok) throw new Error("검색 실패");
      const json = await res.json();
      return json.documents;
    },
    enabled: false, // 버튼 클릭 시 실행
  });

  return (
    <div className="add-card">
      <img className="multiply" src={multiply} onClick={onCancel} />

      <div className="add-logo">
        <DayClouds className="add-logo-image" />
        <div className="add-logo-title">날씨 위치 추가</div>
      </div>

      <div className="title-input-container">
        <div className="title-text">장소 이름</div>
        <Input
          wrapperClassName="input"
          placeholder="장소를 입력해주세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          endIcon={
            <img
              src={zoomFrontColor}
              className="w-6 h-6"
              onClick={() => refetch()}
            />
          }
        />
      </div>

      <div className="location-container">
        {isLoading && <div>검색 중...</div>}
        {isError && <div>검색 중 오류 발생</div>}
        {data &&
          data.map((place) => {
            const isSelected = place.id === selectedId;
            return (
              <div
                key={place.id}
                className="location-item"
                onClick={() => setSelectedId(place.id)}
              >
                <div className="location-item-title">{place.place_name}</div>
                <div className="location-item-detail">
                  {place.road_address_name || place.address_name}
                </div>
                {isSelected && (
                  <img
                    className="location-item-check"
                    src={tickFrontColor}
                    alt="선택됨"
                  />
                )}
              </div>
            );
          })}
      </div>

      <div className="okbutton-container">
        <Button
          className="okbutton"
          onClick={() => {
            const selectedPlace =
              data?.find((p) => p.id === selectedId) || null;
            onConfirm(selectedPlace);
          }}
        >
          <div className="okbutton-text">확인</div>
        </Button>
      </div>
    </div>
  );
}
