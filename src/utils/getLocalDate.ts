export const formatLocalDate = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${month}월 ${day}일`;
};
