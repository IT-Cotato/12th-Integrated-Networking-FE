export interface AirQualityResponse {
  coord: [number, number];
  list: AirQualityItem[];
}

export interface AirQualityItem {
  dt: number; // timestamp (unix)
  main: {
    aqi: number; // Air Quality Index
  };
  components: {
    co: number; // 일산화탄소
    no: number; // 일산화질소
    no2: number; // 이산화질소
    o3: number; // 오존
    so2: number; // 이산화황
    pm2_5: number; // PM2.5
    pm10: number; // PM10
    nh3: number; // 암모니아
  };
}
