import { LoginCard } from "../components/widgets/LoginCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";

export const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (loginId: string, password: string) => {
    try {
      setLoading(true);

      const res = await login(loginId, password);

      console.log("로그인 성공:", res);

      // 성공했을 때: 보통 토큰을 저장하지만 지금 응답엔 id만 있음
      // 필요하면 localStorage에 저장 가능
      localStorage.setItem("userId", res.data.loginId);

      navigate("/home");
    } catch (err: any) {
      alert("로그인 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-screen h-screen items-center justify-center relative bg-neutral-100">
      <LoginCard onLogin={handleLogin} />
    </div>
  );
};
