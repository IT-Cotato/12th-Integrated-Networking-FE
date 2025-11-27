import { useState } from "react";
import mapPinFrontColor from "../../assets/img/map-pin-front-color.png";
import plusFrontClay from "../../assets/img/plus-front-clay.png";
import pinFrontColor from "../../assets/img/pin-front-color.png"; // 빨간 핀
import pinFrontClay from "../../assets/img/pin-front-clay.png"; // 회색 핀
import trashCanFrontColor from "../../assets/img/trash-can-front-color.png";
import DaySun from "../../assets/img/Day-Sun.png";
import Button from "../html/Button";
import type { KakaoPlace } from "../../types/kakao";
import { pinLocation } from "../../api/locations";

interface SidebarProps {
  places: KakaoPlace[];
  setPlaces: React.Dispatch<React.SetStateAction<KakaoPlace[]>>;
  onAddClick: () => void;
  onLogout: () => void;
  onDeleteClick: (id: string) => void;
  onSelect: (id: string) => void;
}

export default function Sidebar({
  onLogout,
  places,
  setPlaces,
  onDeleteClick,
  onAddClick,
  onSelect,
}: SidebarProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    places[0]?.id ?? null
  ); //핀 고정 선택
  const [hoveredId, setHoveredId] = useState<string | null>(null); //마우스 호버
  const [chosenId, setChosenId] = useState<string | null>(null); //선택된 장소
  const loginId = localStorage.getItem("userId");

  // 핀 클릭 → 최상단 이동
  const handleSelect = async (id: string) => {
    try {
      await pinLocation(Number(id)); // ★ 서버에 핀 고정 요청

      // ★ UI에서도 최상단 이동
      const selectedPlace = places.find((p) => p.id === id);
      const others = places.filter((p) => p.id !== id);

      setPlaces([selectedPlace!, ...others]);
      setSelectedId(id);
      // Home.tsx로 선택된 ID 전달
      onSelect(id);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "핀 고정 실패");
    }
  };

  return (
    <div className="flex flex-col w-[248px] min-w-[248px] h-screen items-start justify-between px-4 py-12 relative bg-variable-collection-color-gray-0 rounded-[0px_48px_48px_0px] shadow-[2px_0px_4px_#0000001a]">
      {/* ==== 상단 메뉴 ==== */}
      <div className="flex flex-col items-start gap-10 w-full z-1">
        <div className="inline-flex items-center gap-4">
          <img className="w-10 h-10" src={mapPinFrontColor} />
          <div className="font-bold text-variable-collection-color-gray-60 text-xl">
            위치 목록
          </div>
        </div>

        <Button className="inline-flex items-center gap-4" onClick={onAddClick}>
          <img className="w-10 h-10" src={plusFrontClay} />
          <div className="font-bold text-variable-collection-color-gray-60 text-xl">
            추가하기
          </div>
        </Button>

        {/* ==== 장소 목록 ==== */}
        <div className="flex flex-col w-full gap-2">
          {places.map((place) => {
            const isSelected = place.id === selectedId;
            const isHovered = place.id === hoveredId;
            const isChosen = place.id === chosenId;

            return (
              <div
                key={place.id}
                className={`relative flex flex-row items-center gap-3 p-2 w-full cursor-pointer
                ${
                  isChosen
                    ? "bg-gray-10 rounded-xl shadow-[-2px_2px_2px_1px_#0000001a]"
                    : ""
                }
            
                `}
                onMouseEnter={() => {
                  setHoveredId(place.id);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                }}
              >
                {/* 핀 아이콘 클릭 → 최상단 이동 */}
                <img
                  className="w-6 h-6 cursor-pointer"
                  src={isSelected ? pinFrontColor : pinFrontClay}
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 클릭 막기
                    handleSelect(place.id);
                  }}
                />

                {/* 장소 이름 영역 클릭 → 선택 표시 */}
                <div
                  className="flex-1 w-fit font-semibold text-variable-collection-color-gray-60 text-base overflow-hidden text-ellipsis whitespace-nowrap relative"
                  onClick={() => {
                    if (place.id != chosenId) {
                      setChosenId(place.id);
                    } else {
                      setChosenId(null);
                    }
                    // API 연동 위한 선택 ID 전달
                    onSelect(place.id);
                  }}
                >
                  {place.place_name}
                </div>

                {/* hover 시 쓰레기통 아이콘  */}
                {isHovered && (
                  <img
                    src={trashCanFrontColor}
                    className="z-10 relative w-5 h-5 cursor-pointer transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClick(place.id); // Home에 알려서 모달 열기
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ==== 하단 사용자 정보 ==== */}
      <div className="flex flex-col items-center gap-2.5 w-full">
        <div className="inline-flex items-center gap-2">
          <div
            className="w-9 h-9 bg-center bg-cover rounded-full border border-gray-10"
            style={{ backgroundImage: `url(${DaySun})` }}
          />
          <div className="font-semibold text-gray-60">{loginId}</div>
        </div>

        <Button
          className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 bg-gray-20 rounded-[10px] cursor-pointer"
          onClick={onLogout}
        >
          <div className="font-semibold text-gray-60 text-sm">로그아웃</div>
        </Button>
      </div>
    </div>
  );
}
