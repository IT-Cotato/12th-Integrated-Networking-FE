import { DaySun } from "../img/DaySun";
import Button from "../html/Button";
import Input from "../html/Input";
import { useState } from "react";

interface LoginCardProps {
  onLogin: (loginId: string, password: string) => void;
}

export const LoginCard = ({ onLogin }: LoginCardProps) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // form 기본 제출 막기
    onLogin(id, pw); // Login.tsx에서 navigate("/home")
  };

  return (
    <div className="login-card">
      <div className="login-logo">
        <DaySun className="login-logo-image" />
        <div className="login-logo-title">The Weather App</div>
      </div>

      <form className="login-input-container" onSubmit={handleSubmit}>
        <div className="login-input-inputs">
          <Input
            wrapperClassName="login-input-box"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          <Input
            wrapperClassName="login-input-box"
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>

        <Button className="login-button-box" type="submit">
          <div className="login-button-text">로그인</div>
        </Button>
      </form>
    </div>
  );
};
