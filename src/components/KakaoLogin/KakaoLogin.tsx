import { type User } from '../../types/Login';
import { 
  logoutFromBackend,
  clearTokens 
} from '../../services/AuthService';

interface KakaoLoginProps {
  user: User | null;
  onLogout: () => void;
}

export default function KakaoLogin({ user, onLogout }: KakaoLoginProps) {
  const handleLogin = () => {
  //const KAKAO_REST_API_KEY = 'd2ffdfaa297012904086e71f5d7eda1f';
  //const REDIRECT_URI = 'http://localhost:5173/oauth/kakao/callback'; // ✅ 정확히 일치
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=d2ffdfaa297012904086e71f5d7eda1f&redirect_uri=http://localhost:5173/oauth/kakao/callback&response_type=code `;
  window.location.href = kakaoAuthUrl;
};


  const handleLogout = async () => {
    try {
      await logoutFromBackend();
      clearTokens();
      onLogout();
      console.log('로그아웃 완료');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      clearTokens();
      onLogout();
    }
  };

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