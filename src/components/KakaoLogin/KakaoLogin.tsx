import { useEffect, useState, useCallback } from 'react';
import type { KakaoUserInfo, KakaoError } from '../../types/Login';

interface KakaoLoginProps {
  onLogin: (user: KakaoUserInfo) => void;
  onLogout: () => void;
}

export default function KakaoLogin({ onLogin, onLogout }: KakaoLoginProps) {
  const [user, setUser] = useState<KakaoUserInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sdkError, setSdkError] = useState(false);

  // 사용자 정보 가져오기
  const getUserInfo = useCallback(() => {
    if (!window.Kakao || !window.Kakao.API) {
      console.error('Kakao API가 없습니다.');
      return;
    }

    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (response: KakaoUserInfo) => {
        setUser(response);
        onLogin(response);
        setIsLoading(false);
      },
      fail: (error: KakaoError) => {
        console.error('사용자 정보 가져오기 실패:', error.msg);
        setIsLoading(false);
      },
    });
  }, [onLogin]);

  useEffect(() => {
    // Kakao SDK 체크 및 초기화
    const initializeKakao = () => {
      // SDK 로드 대기
      const checkKakaoLoaded = setInterval(() => {
        if (window.Kakao) {
          clearInterval(checkKakaoLoaded);
          
          // 초기화
          if (!window.Kakao.isInitialized()) {
            try {
              window.Kakao.init('0a7e24209d21f9136432d2defd7ac84a');
              console.log('Kakao SDK 초기화 완료');
              console.log('Kakao 객체:', window.Kakao);
            } catch (error) {
              console.error('Kakao 초기화 실패:', error);
              setSdkError(true);
              setIsLoading(false);
              return;
            }
          }
          
          setIsInitialized(true);

          // 이미 로그인되어 있는지 확인
          if (window.Kakao.Auth && window.Kakao.Auth.getAccessToken) {
            const token = window.Kakao.Auth.getAccessToken();
            if (token) {
              getUserInfo();
            } else {
              setIsLoading(false);
            }
          } else {
            console.error('Kakao.Auth가 로드되지 않았습니다.');
            setIsLoading(false);
          }
        }
      }, 100);

      // 5초 후에도 로드 안되면 에러 처리
      setTimeout(() => {
        if (!window.Kakao) {
          clearInterval(checkKakaoLoaded);
          console.error('Kakao SDK 로드 타임아웃');
          setSdkError(true);
          setIsLoading(false);
        }
      }, 10000);
    };

    initializeKakao();
  }, [getUserInfo]);

    const handleLogin = () => {
      // isInitialized 상태를 확인하여 초기화 완료를 보장합니다.
      if (!isInitialized) {
        alert('카카오 SDK가 초기화되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      
      // 이전과 동일하게 Auth 객체와 login 함수가 있는지 한 번 더 확인
      if (!window.Kakao.Auth || !window.Kakao.Auth.login) {
        console.error('Kakao.Auth.login이 없습니다. Kakao 객체:', window.Kakao);
        alert('카카오 로그인 기능을 사용할 수 없습니다. 페이지를 새로고침해주세요.');
        return;
      }

    try {
      window.Kakao.Auth.login({
        success: () => {
          console.log('로그인 성공');
          getUserInfo();
        },
        fail: (error: KakaoError) => {
          console.error('로그인 실패:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        },
      });
    } catch (error) {
      console.error('로그인 호출 중 에러:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    if (!window.Kakao || !window.Kakao.Auth) {
      return;
    }

    window.Kakao.Auth.logout(() => {
      setUser(null);
      onLogout();
      console.log('로그아웃 완료');
    });
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
            {user.kakao_account.profile.profile_image_url && (
              <img
                src={user.kakao_account.profile.profile_image_url}
                alt="프로필"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm font-medium">
              {user.kakao_account.profile.nickname}님
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