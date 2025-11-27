import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithKakaoCode, saveTokens } from '../services/AuthService';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        alert('로그인에 실패했습니다.');
        navigate('/');
        return;
      }

      try {
        // 직접 값 사용
        const redirectUri = 'http://localhost:5173/oauth/callback';
        const response = await loginWithKakaoCode(code, redirectUri);

        saveTokens(response.accessToken, response.refreshToken);

        navigate('/');
      } catch (error) {
        console.error('로그인 처리 실패:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/');
      }
    };

    handleKakaoCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg">로그인 처리 중...</div>
    </div>
  );
}