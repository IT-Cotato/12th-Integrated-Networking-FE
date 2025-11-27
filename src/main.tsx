import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { loginWithKakaoCode } from "./services/AuthService";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function AuthCallback() {
  const navigate = useNavigate();
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const handleKakaoCallback = async () => {
      console.log("====================================");
      console.log("🎬 카카오 콜백 처리 시작");
      console.log("====================================");

      if (isProcessingRef.current) {
        console.log("⚠️ 이미 처리 중");
        return;
      }

      isProcessingRef.current = true;

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      console.log("받은 인가 코드:", code);

      if (!code) {
        console.error("❌ 인가 코드가 없습니다");
        alert("로그인에 실패했습니다.");
        navigate("/");
        return;
      }

      try {
        const redirectUri = "http://localhost:5173/oauth/kakao/callback";

        console.log("🚀 백엔드로 로그인 요청...");
        const response = await loginWithKakaoCode(code, redirectUri);

        console.log("====================================");
        console.log("✅ 백엔드 응답 받음");
        console.log("====================================");
        console.log("응답 데이터:", {
          accessToken: response.accessToken ? "있음" : "없음",
          refreshToken: response.refreshToken ? "있음" : "없음",
          memberId: response.memberId,
          nickname: response.nickname,
        });

        // ⭐ 응답 검증
        if (!response.accessToken || !response.refreshToken) {
          console.error("❌ 응답에 토큰이 없습니다!");
          alert("서버 응답에 토큰이 없습니다.");
          navigate("/");
          return;
        }

        console.log("====================================");
        console.log("💾 토큰 저장 시작...");
        console.log("====================================");

        // ⭐ 토큰 저장 (try-catch로 감싸기)
        try {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("memberId", response.memberId.toString());
          localStorage.setItem("nickname", response.nickname);

          if (response.profileImageUrl) {
            localStorage.setItem("profileImageUrl", response.profileImageUrl);
          }

          console.log("✅ localStorage.setItem 호출 완료");
        } catch (storageError) {
          console.error("❌ localStorage 저장 실패:", storageError);
          alert(
            "브라우저 저장소에 저장할 수 없습니다. 시크릿 모드를 사용 중이신가요?"
          );
          navigate("/");
          return;
        }

        // ⭐ 저장 확인 (중요!)
        const savedAccessToken = localStorage.getItem("accessToken");
        const savedRefreshToken = localStorage.getItem("refreshToken");
        const savedMemberId = localStorage.getItem("memberId");
        const savedNickname = localStorage.getItem("nickname");

        console.log("====================================");
        console.log("📦 저장 확인");
        console.log("====================================");
        console.log(
          "accessToken:",
          savedAccessToken
            ? `${savedAccessToken.substring(0, 30)}...`
            : "❌ 없음"
        );
        console.log(
          "refreshToken:",
          savedRefreshToken
            ? `${savedRefreshToken.substring(0, 30)}...`
            : "❌ 없음"
        );
        console.log("memberId:", savedMemberId);
        console.log("nickname:", savedNickname);

        // ⭐ 저장 검증
        if (!savedAccessToken || !savedRefreshToken) {
          console.error("====================================");
          console.error("❌ 토큰 저장 실패!");
          console.error("====================================");
          console.error("accessToken 저장됨:", !!savedAccessToken);
          console.error("refreshToken 저장됨:", !!savedRefreshToken);

          alert("토큰 저장에 실패했습니다. 시크릿 모드가 아닌지 확인해주세요.");
          return;
        }

        console.log("====================================");
        console.log("✅ 토큰 저장 완료!");
        console.log("====================================");

        // ⭐ 약간의 딜레이 (저장 완료 보장)
        console.log("⏳ 0.2초 대기 중...");
        await new Promise((resolve) => setTimeout(resolve, 200));

        console.log("🏠 메인 페이지로 이동...");

        // ⭐ 페이지 이동 (완전 새로고침)
        window.location.href = "/";
      } catch (error) {
        console.error("====================================");
        console.error("❌ 로그인 처리 실패");
        console.error("====================================");
        console.error("Error:", error);

        isProcessingRef.current = false;

        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data;
          console.error("상태 코드:", error.response?.status);
          console.error("에러 데이터:", errorData);

          alert(`로그인 실패: ${errorData?.message || "서버 오류"}`);
        } else {
          alert("로그인 처리 중 오류가 발생했습니다.");
        }

        navigate("/");
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

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/oauth/kakao/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// StrictMode 제거
createRoot(document.getElementById("root")!).render(<Root />);
