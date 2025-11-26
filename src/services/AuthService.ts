import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export interface BackendLoginResponse {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

// 백엔드 장소 정보
export interface BackendLocation {
  id: number;
  placeName: string;
  latitude: number;
  longitude: number;
  address: string;
  isPinned: boolean;
  createdAt: string;
  modifiedAt: string;
}

// ✅ 추가: 장소 목록 조회 응답
export interface GetLocationsResponse {
  places: BackendLocation[];
  count: number;
}

// 장소 추가 요청 데이터
export interface AddLocationRequest {
  placeName: string;
  latitude: number;
  longitude: number;
  address: string;
  isPinned: boolean;
}

// ========== 인증 관련 API ==========

// 카카오 로그인
export const loginWithKakao = async (kakaoAccessToken: string): Promise<BackendLoginResponse> => {
  const response = await api.post('/api/auth/kakao/login', {
    accessToken: kakaoAccessToken,
  });
  return response.data;
};

// 로그아웃
export const logoutFromBackend = async (): Promise<void> => {
  await api.post('/api/auth/kakao/logout');
};

// ========== 장소 관련 API ==========

// ✅ 수정: 장소 목록 조회 - places 배열 반환
export const getLocations = async (): Promise<BackendLocation[]> => {
  const response = await api.get<GetLocationsResponse>('/api/locations');
  return response.data.places; // places 배열만 반환
};

// 장소 추가
export const addLocation = async (locationData: AddLocationRequest): Promise<BackendLocation> => {
  const response = await api.post('/api/locations', locationData);
  return response.data;
};

// 장소 삭제
export const deleteLocation = async (locationId: number): Promise<void> => {
  await api.delete(`/api/locations/${locationId}`);
};

// ========== 토큰 관련 ==========

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// API 요청 시 자동으로 JWT 토큰 추가
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;