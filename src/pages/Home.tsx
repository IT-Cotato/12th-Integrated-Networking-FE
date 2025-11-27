import { useEffect, useState } from "react";
import AddModal from "../components/widgets/AddModal";
import DeleteModal from "../components/widgets/DeleteModal";
import HomeDefault from "../components/widgets/HomeDefault";
import Sidebar from "../components/widgets/Sidebar";
import { useNavigate } from "react-router-dom";
import type { KakaoPlace } from "../types/kakao";
import TodayWeatherPanel from "../components/weather/TodayWeatherPanel";
import HourlyWeatherPanel from "../components/weather/HourlyWeatherPanel";
import WeeklyWeatherPanel from "../components/weather/WeeklyWeatherPanel";
import { useWeather } from "../hooks/useWeather";
import { logout } from "../api/auth";
import { createLocation, deleteLocation, getLocations } from "../api/locations";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // API 호출은 여기서 끝
      navigate("/");
      console.log("로그아웃 성공");
    } catch {
      alert("로그아웃 실패");
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsFromServer = await getLocations();
        const formatted: KakaoPlace[] = locationsFromServer.map((loc: any) => ({
          id: String(loc.id),
          place_name: loc.locationName,
          address_name: loc.addressName || "",
          road_address_name: loc.roadAddressName || "",
          x: String(loc.longitude),
          y: String(loc.latitude),
        }));
        setPlaces(formatted);
      } catch (err) {
        console.error(err);
        alert("위치 목록 불러오기 실패");
      }
    };

    fetchLocations();
  }, []);
  // Weather API 연동
  const { today, hourly, weekly, loading } = useWeather(
    selectedId ? Number(selectedId) : null
  );

  // Sidebar에서 삭제 클릭 시 호출
  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  //삭제 확인
  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteLocation(Number(deleteTargetId)); // ★ 서버에 삭제 요청

      // UI에서도 제거
      setPlaces((prev) => prev.filter((p) => p.id !== deleteTargetId));
      alert("삭제되었습니다!");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "위치 삭제 실패");
    }

    setDeleteTargetId(null);
    setDeleteModalOpen(false);
  };

  //삭제 취소
  const cancelDelete = () => {
    setDeleteTargetId(null);
    setDeleteModalOpen(false);
  };

  //Sidebar에서 추가 클릭 시 호출
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  //추가 취소
  const cancelAdd = () => {
    setAddModalOpen(false);
  };
  //추가 확정
  const confirmAdd = async (selectedPlace: KakaoPlace | null) => {
    if (!selectedPlace) {
      setAddModalOpen(false);
      return;
    }

    try {
      // 서버에 위치 등록
      const created = await createLocation(
        selectedPlace.place_name, // locationName
        Number(selectedPlace.y), // latitude
        Number(selectedPlace.x) // longitude
      );

      // 서버에서 만들어준 id를 사용해 UI 갱신
      setPlaces((prev) => [
        ...prev,
        {
          id: String(created.id), // 서버에서 받은 ID
          place_name: created.locationName,
          address_name: "",
          road_address_name: "",
          x: String(created.longitude),
          y: String(created.latitude),
        },
      ]);

      alert("등록되었습니다!");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "위치 등록 실패");
    }

    setAddModalOpen(false);
  };

  return (
    <div className="flex w-screen h-screen items-center gap-0 relative bg-neutral-100">
      <Sidebar
        places={places}
        setPlaces={setPlaces}
        onDeleteClick={openDeleteModal}
        onAddClick={openAddModal}
        onLogout={handleLogout}
        onSelect={(id) => setSelectedId(id)}
      />
      <div className="flex flex-col w-full items-center relative">
        {places.length > 0 ? (
          //추가된 장소가 있는 경우
          <div className="w-full flex justify-center pt-16 pb-20">
            <div className="w-full max-w-[1100px] px-6 flex flex-col gap-12 items-center">
              {/* 로딩 중 */}
              {loading && (
                <p className="text-gray-60 text-lg">날씨 불러오는 중...</p>
              )}

              {/* 실제 패널 */}
              {!loading && today && (
                <>
                  <TodayWeatherPanel data={today} />
                  <HourlyWeatherPanel list={hourly} />
                  <WeeklyWeatherPanel data={weekly} />
                </>
              )}
            </div>
          </div>
        ) : (
          //추가된 장소가 없는 경우
          <HomeDefault />
        )}
      </div>

      {/* 장소 삭제 모달 + 배경 */}
      {deleteModalOpen && (
        <>
          {/* 전체 배경 어둡게 */}
          <div className="absolute w-screen h-screen inset-0 bg-gray-500/30 z-40"></div>

          {/* 중앙 모달 */}
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <DeleteModal onCancel={cancelDelete} onConfirm={confirmDelete} />
          </div>
        </>
      )}

      {/* 장소 추가 모달 + 배경 */}
      {addModalOpen && (
        <>
          {/* 전체 배경 어둡게 */}
          <div className="absolute w-screen h-screen inset-0 bg-gray-500/30 z-40"></div>

          {/* 중앙 모달 */}
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <AddModal onCancel={cancelAdd} onConfirm={confirmAdd} />
          </div>
        </>
      )}
    </div>
  );
}
