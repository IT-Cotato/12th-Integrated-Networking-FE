// useDate 커스텀 훅(미완성)
import { useState } from "react";

const useDate = () => {
  const today = new Date();
  //${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}
  const [date, setDate] = useState({
    date: "11.19",
    day: "수요일",
    time: 15,
  });
};
