import { useEffect, useState } from 'react';
import type { KakaoError, User } from '../../types/Login';
import { 
  loginWithKakao, 
  saveTokens, 
  logoutFromBackend,
  clearTokens 
} from '../../services/AuthService';

interface KakaoLoginProps {
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export default function KakaoLogin({ onLogin, onLogout }: KakaoLoginProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sdkError, setSdkError] = useState(false);

  useEffect(() => {
    const initializeKakao = () => {
      const checkKakaoLoaded = setInterval(() => {
        if (window.Kakao) {
          clearInterval(checkKakaoLoaded);
          
          if (!window.Kakao.isInitialized()) {
            try {
              window.Kakao.init('0a7e24209d21f9136432d2defd7ac84a');
              console.log('Kakao SDK 초기화 완료');
            } catch (error) {
              console.error('Kakao 초기화 실패:', error);
              setSdkError(true);
              setIsLoading(false);
              return;
            }
          }
          
          setIsInitialized(true);
          setIsLoading(false);
        }
      }, 100);

      setTimeout(() => {
        if (!window.Kakao) {
          clearInterval(checkKakaoLoaded);
          console.error('Kakao SDK 로드 타임아웃');
          setSdkError(true);
          setIsLoading(false);
        }
      }, 5000);
    };

    initializeKakao();
  }, []);

  const handleLogin = async () => {
    if (!window.Kakao || !window.Kakao.Auth || !window.Kakao.Auth.login) {
      console.error('Kakao.Auth.login이 없습니다.');
      alert('카카오 로그인 기능을 사용할 수 없습니다. 페이지를 새로고침해주세요.');
      return;
    }

    try {
      window.Kakao.Auth.login({
        success: async () => {
          console.log('카카오 로그인 성공');
          
          const kakaoAccessToken = window.Kakao.Auth.getAccessToken();
          
          if (!kakaoAccessToken) {
            alert('카카오 토큰을 가져올 수 없습니다.');
            return;
          }

          try {
            const response = await loginWithKakao(kakaoAccessToken);
            
            saveTokens(response.accessToken, response.refreshToken);
            
            const userData: User = {
              memberId: response.memberId,
              nickname: response.nickname,
              profileImageUrl: response.profileImageUrl,
              isNewUser: response.isNewUser,
            };
            
            setUser(userData);
            onLogin(userData);
            
            if (response.isNewUser) {
              console.log('신규 사용자입니다!');
            }
          } catch (error) {
            console.error('백엔드 로그인 실패:', error);
            alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
          }
        },
        fail: (error: KakaoError) => {
          console.error('카카오 로그인 실패:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        },
      });
    } catch (error) {
      console.error('로그인 호출 중 에러:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    if (!window.Kakao || !window.Kakao.Auth) {
      return;
    }

    try {
      // 1. 백엔드 로그아웃 API 호출
      await logoutFromBackend();
      
      // 2. 카카오 SDK 로그아웃
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');
      });
      
      // 3. 로컬 스토리지에서 JWT 토큰 삭제
      clearTokens();
      
      // 4. 상태 초기화
      setUser(null);
      onLogout();
      
      console.log('로그아웃 완료');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      
      // 에러가 나도 로컬 정보는 삭제
      clearTokens();
      setUser(null);
      onLogout();
      
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (sdkError || !isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center p-4 gap-2">
        <div className="text-sm text-red-500">카카오 SDK 로드 실패</div>
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-blue-500 underline"
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4">
      {user ? (
        <>
          <div className="flex items-center gap-2">
            {user.profileImageUrl && (
              <img
                src={user.profileImageUrl}
                alt="프로필"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm font-medium">
              {user.nickname}님
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            로그아웃
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
          </svg>
          카카오 로그인
        </button>
      )}
    </div>
  );
}