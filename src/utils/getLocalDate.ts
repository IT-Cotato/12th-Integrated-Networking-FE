const getTodayParts = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
};

// 오늘 날짜 "11월 19일" 형식
export const formatLocalDate = () => {
  const { month, day } = getTodayParts();
  return `${month}월 ${day}일`;
};

// "11.19" 형식
export const formatLocalDateWithDot = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`;
};

// 요일
export const getKoreanDayLabel = (dateString: string) => {
  const target = new Date(dateString);
  const today = new Date();

  const isToday =
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate();

  if (isToday) return "오늘";

  const day = target.getDay(); // 0~6
  const DAY_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

  return DAY_LABEL[day];
};
