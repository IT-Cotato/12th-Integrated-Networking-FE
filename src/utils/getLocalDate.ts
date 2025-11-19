const getTodayParts = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
};

// "11월 19일" 형식
export const formatLocalDate = () => {
  const { month, day } = getTodayParts();
  return `${month}월 ${day}일`;
};

// "11.19" 형식
export const formatLocalDateWithDot = () => {
  const { month, day } = getTodayParts();
  return `${month}.${day}`;
};

export const getKoreanDayLabel = (dateString: string) => {
  const target = new Date(dateString);
  const today = new Date();

  // 날짜 비교 (연/월/일만 비교)
  const isToday =
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate();

  if (isToday) return "오늘";

  const day = target.getDay(); // 0~6
  const DAY_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

  return DAY_LABEL[day];
};
