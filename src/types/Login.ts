// 카카오 사용자 정보 타입
export interface KakaoUserInfo {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    email?: string;
    age_range?: string;
    birthday?: string;
    gender?: 'male' | 'female';
  };
  properties?: {
    nickname?: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
}

// 카카오 로그인 응답 타입
export interface KakaoAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

// 카카오 API 에러 타입
export interface KakaoError {
  code: number;
  msg: string;
  api_type?: string;
}

// 카카오 Auth 객체 타입
interface KakaoAuth {
  login(settings: {
    success: (response: KakaoAuthResponse) => void;
    fail: (error: KakaoError) => void;
    scope?: string;
    throughTalk?: boolean;
    redirectUri?: string;
  }): void;
  
  logout(callback?: () => void): void;
  
  getAccessToken(): string | null;
  
  setAccessToken(token: string): void;
}

// 카카오 API 객체 타입
interface KakaoAPI {
  request(settings: {
    url: string;
    data?: Record<string, unknown>;
    success?: (response: KakaoUserInfo) => void;
    fail?: (error: KakaoError) => void;
  }): void;
}

// 카카오 SDK 전체 타입 (로그인용)
export interface KakaoSDK {
  init(appKey: string): void;
  isInitialized(): boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

// Window 객체에 Kakao만 추가 (kakao는 제거)
declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}