// 일출시간에서 활용
export const formatLocalTime = (t: string) => {
  const date = new Date(t);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
};

// weeklyTime에서 활용
export const formatLocalHour = (t: string) => {
  const date = new Date(t);
  const hour = date.getHours().toString().padStart(2, "0");
  return `${hour}시`;
};
