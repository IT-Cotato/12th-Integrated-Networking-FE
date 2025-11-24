// src/api/fetch-locations.ts
export async function fetchLocations() {
  const res = await fetch('/api/locations'); // 실제 API
  if (!res.ok) throw new Error('위치 목록 요청 실패');
  return res.json();
}
