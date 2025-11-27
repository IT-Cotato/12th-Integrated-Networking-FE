export interface Location {
  id: string;
  name: string;
  address: string;
  x: string; // 경도
  y: string; // 위도
  isFixed?: boolean;
}
