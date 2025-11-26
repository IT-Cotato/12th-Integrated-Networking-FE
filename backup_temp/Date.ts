// src/utils/date.ts
export const todayApiDate = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  // YYYY-MM-DD
  return d.toISOString().split("T")[0];
};

export const toDisplayDate = (apiDate: string) => {
  // apiDate: "2025-11-24" -> displayDate: "11월 24일"
  const [, m, d] = apiDate.split("-");
  return `${Number(m)}월 ${Number(d)}일`;
};
