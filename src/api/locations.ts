const BASE_URL = "http://35.74.254.38:8080";

export async function getLocations() {
  const res = await fetch(`/api/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ★ 로그인 세션 유지 필수
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "위치 목록 가져오기 실패");
  }

  return data.data; // 실제 등록된 location 데이터
}

export async function createLocation(
  locationName: string,
  latitude: number,
  longitude: number
) {
  const res = await fetch(`/api/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ★ 로그인 세션 유지 필수
    body: JSON.stringify({
      locationName,
      latitude,
      longitude,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "위치 등록 실패");
  }

  return data.data; // 실제 등록된 location 데이터
}

export async function deleteLocation(id: number) {
  const res = await fetch(`/api/locations/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ★ 로그인 세션 유지 필수
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "위치 삭제 실패");
  }

  return data.data; // 실제 등록된 location 데이터
}

export async function pinLocation(id: number) {
  const res = await fetch(`/api/locations/${id}/pin`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ★ 로그인 세션 유지 필수
    body: JSON.stringify({
      isPinned: true, // ★ 필수!
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "핀 고정 실패");
  }

  return data.data; // 실제 등록된 location 데이터
}
