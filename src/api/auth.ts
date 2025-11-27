const BASE_URL = "http://35.74.254.38:8080";

export async function login(loginId: string, password: string) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ★ 쿠키 수신 필수
    body: JSON.stringify({ loginId, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "로그인 실패");
  }

  return data;
}

export async function logout() {
  const res = await fetch(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "로그아웃 실패");
  }

  return true;
}
