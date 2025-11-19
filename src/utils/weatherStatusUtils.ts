// TBD: enum타입이 아니라 string타입이라면 제거할 것
export const toStatusKey = (value: string): "fine" | "normal" | "danger" => {
  if (["fine", "normal", "danger"].includes(value)) {
    return value as "fine" | "normal" | "danger";
  }
  return "normal";
};
