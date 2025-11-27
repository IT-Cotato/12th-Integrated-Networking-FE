import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://43.200.174.15:8080',
});

export interface BackendLoginResponse {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

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

export interface GetLocationsResponse {
  places: BackendLocation[];
  count: number;
}

export interface AddLocationRequest {
  placeName: string;
  latitude: number;
  longitude: number;
  address: string;
  isPinned: boolean;
}

// ========== 인증 관련 API ==========

// ✅ 수정: Authorization Code로 로그인
export const loginWithKakaoCode = async (
  authorizationCode: string,
  redirectUri: string
): Promise<BackendLoginResponse> => {
  console.log('=== 백엔드로 전송할 데이터 ===');
  console.log('authorizationCode:', authorizationCode);
  console.log('redirectUri:', redirectUri);
  console.log('API baseURL:', api.defaults.baseURL);
  
  const response = await api.post('/api/auth/kakao/login', {
    authorizationCode,
    redirectUri,
  });
  return response.data;
};

// 로그아웃
export const logoutFromBackend = async (): Promise<void> => {
  await api.post('/api/auth/kakao/logout');
};

// ========== 장소 관련 API ==========

export const getLocations = async (): Promise<BackendLocation[]> => {
  const response = await api.get<GetLocationsResponse>('/api/locations');
  return response.data.places;
};

export const addLocation = async (locationData: AddLocationRequest): Promise<BackendLocation> => {
  const response = await api.post('/api/locations', locationData);
  return response.data;
};

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