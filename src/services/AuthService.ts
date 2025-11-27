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
  console.log('====================================');
  console.log('카카오 로그인 요청 시작');
  console.log('====================================');
  console.log('요청 보낼 때 URI:', redirectUri);
  console.log('인가 코드:', authorizationCode);
  console.log('API baseURL:', api.defaults.baseURL);
  console.log('전체 URL:', `${api.defaults.baseURL}/api/auth/kakao/login`);
  console.log('====================================');
  
  try {
    const requestData = {
      authorizationCode,
      redirectUri,
    };
    
    console.log('요청 Body:', JSON.stringify(requestData, null, 2));
    
    const response = await api.post('/api/auth/kakao/login', requestData);
    
    console.log('✅ 백엔드 원본 응답:', response.data);
    
    // ⭐ 백엔드 응답 구조 처리
    // { code: 'SUCCESS', message: '성공', data: {...} } 형식인 경우
    const loginData = response.data.data || response.data;
    
    console.log('✅ 처리된 로그인 데이터:', {
      accessToken: loginData.accessToken ? '있음' : '없음',
      refreshToken: loginData.refreshToken ? '있음' : '없음',
      memberId: loginData.memberId,
      nickname: loginData.nickname,
    });
    console.log('====================================');
    
    return loginData;
    
  } catch (error) {
    console.error('====================================');
    console.error('로그인 요청 실패');
    console.error('====================================');
    
    if (axios.isAxiosError(error)) {
      console.error('Status Code:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('Error Data:', error.response?.data);
      console.error('Error Message:', error.message);
    } else {
      console.error('Unknown Error:', error);
    }
    
    console.error('====================================');
    throw error;
  }
};

// 로그아웃
export const logoutFromBackend = async (): Promise<void> => {
  await api.post('/api/auth/kakao/logout');
};

// ========== 장소 관련 API ==========

export const getLocations = async (): Promise<BackendLocation[]> => {
  const response = await api.get<GetLocationsResponse>('/api/cotato/backend/place/locations');
  return response.data.places;
};

export const addLocation = async (locationData: AddLocationRequest): Promise<BackendLocation> => {
  const response = await api.post('/api/cotato/backend/place/locations', locationData);
  return response.data;
};

export const deleteLocation = async (locationId: number): Promise<void> => {
  await api.delete(`/api/cotato/backend/place/locations${locationId}`);
};

// ========== 토큰 관련 ==========

export const saveTokens = (accessToken: string, refreshToken: string) => {
  console.log('💾 saveTokens 함수 호출됨');
  console.log('Access Token:', accessToken ? '있음' : '없음');
  console.log('Refresh Token:', refreshToken ? '있음' : '없음');
  
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  console.log('✅ localStorage.setItem 완료');
  
  // 저장 확인
  const saved1 = localStorage.getItem('accessToken');
  const saved2 = localStorage.getItem('refreshToken');
  console.log('저장 확인:', !!saved1, !!saved2);
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
  
  console.log('🔐 [Interceptor] API 요청');
  console.log('URL:', config.url);
  console.log('토큰 존재:', !!token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization 헤더 추가됨');
  } else {
    console.warn('⚠️ 토큰이 없습니다!');
  }
  
  return config;
});

// 401 에러 자동 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('🚨 API 응답 에러');
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
    
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error('❌ 401 Unauthorized - 토큰이 유효하지 않습니다');
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      clearTokens();
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

export default api;