// src/api/location.ts

export type LocationItem = {
  id: number;
  userId: number;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: string;
};

type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type LocationDTO = {
  id: number;
  userId: number;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: string;
};

const BASE_URL = 'https://cotato-weather.o-r.kr';

// 위치 목록 조회: GET /api/users/{userId}/locations
export async function fetchLocations(userId: number): Promise<LocationDTO[]> {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/locations`);

  if (!res.ok) {
    throw new Error('Failed to fetch locations');
  }

  const body: ApiResponse<LocationItem[]> = await res.json();
  return body.data;
}

// 위치 등록: POST /api/users/{userId}/locations
export async function createLocation(
  userId: number,
  body: { name: string; latitude: number; longitude: number }
): Promise<LocationItem> {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/locations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to create location');
  }

  const responseBody: ApiResponse<LocationItem> = await res.json();
  return responseBody.data;
}

// 위치 단건 조회: GET /api/users/{userId}/locations/{locationId}
export async function fetchLocation(
  userId: number,
  locationId: number
): Promise<LocationItem> {
  const res = await fetch(
    `${BASE_URL}/api/users/${userId}/locations/${locationId}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch location');
  }

  const body: ApiResponse<LocationItem> = await res.json();
  return body.data;
}

// 위치 삭제: DELETE /api/users/{userId}/locations/{locationId}
export async function deleteLocation(
  userId: number,
  locationId: number
): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/api/users/${userId}/locations/${locationId}`,
    { method: 'DELETE' }
  );

  if (!res.ok) {
    throw new Error('Failed to delete location');
  }
}
