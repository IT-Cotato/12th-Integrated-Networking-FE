import type { AirQualityResponse } from '@/types/air-quality.types';

export const mockRes = {
  lat: 33.44,
  lon: -94.04,
  timezone: 'America/Chicago',
  timezone_offset: -18000,

  current: {
    dt: 1731883200,
    sunrise: 1731860400,
    sunset: 1731898200,
    temp: 292.15,
    feels_like: 292.4,
    pressure: 1015,
    humidity: 82,
    dew_point: 288.1,
    uvi: 0.0,
    clouds: 20,
    visibility: 10000,
    wind_speed: 2.5,
    wind_deg: 110,
    weather: [
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' },
    ],
  },

  hourly: [
    // 1. 오전 3시 (현재) - 약간 흐림
    {
      dt: 1731883200,
      temp: 292.15, // 약 19°C
      feels_like: 292.4,
      pressure: 1015,
      humidity: 82,
      dew_point: 288.1,
      uvi: 0,
      clouds: 20,
      visibility: 10000,
      wind_speed: 2.5,
      wind_deg: 110,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' },
      ],
      pop: 0,
    },
    // 2. 오전 4시 - 기온 하강
    {
      dt: 1731886800,
      temp: 291.5, // 약 18.3°C
      feels_like: 291.7,
      pressure: 1015,
      humidity: 84,
      dew_point: 288.0,
      uvi: 0,
      clouds: 20,
      visibility: 10000,
      wind_speed: 2.6,
      wind_deg: 105,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' },
      ],
      pop: 0,
    },
    // 3. 오전 5시 - 최저 기온 근접
    {
      dt: 1731890400,
      temp: 290.8, // 약 17.6°C
      feels_like: 290.9,
      pressure: 1014,
      humidity: 86,
      dew_point: 287.5,
      uvi: 0,
      clouds: 25,
      visibility: 10000,
      wind_speed: 2.8,
      wind_deg: 100,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      pop: 0,
    },
    // 4. 오전 6시 - 최저 기온
    {
      dt: 1731894000,
      temp: 290.2, // 약 17.0°C
      feels_like: 290.3,
      pressure: 1014,
      humidity: 88,
      dew_point: 287.2,
      uvi: 0,
      clouds: 30,
      visibility: 9000,
      wind_speed: 2.9,
      wind_deg: 95,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      pop: 0,
    },
    // 5. 오전 7시 - 일출 직후 (아이콘: day 변경)
    {
      dt: 1731897600,
      temp: 290.5, // 약 17.3°C
      feels_like: 290.6,
      pressure: 1015,
      humidity: 85,
      dew_point: 287.3,
      uvi: 0.5,
      clouds: 20,
      visibility: 10000,
      wind_speed: 3.0,
      wind_deg: 100,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      ],
      pop: 0,
    },
    // 6. 오전 8시 - 기온 상승 시작
    {
      dt: 1731901200,
      temp: 292.0, // 약 18.8°C
      feels_like: 292.1,
      pressure: 1016,
      humidity: 80,
      dew_point: 288.0,
      uvi: 1.2,
      clouds: 10,
      visibility: 10000,
      wind_speed: 3.2,
      wind_deg: 110,
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      pop: 0,
    },
    // 7. 오전 9시 - 맑음
    {
      dt: 1731904800,
      temp: 294.5, // 약 21.3°C
      feels_like: 294.6,
      pressure: 1016,
      humidity: 72,
      dew_point: 288.5,
      uvi: 2.5,
      clouds: 5,
      visibility: 10000,
      wind_speed: 3.5,
      wind_deg: 120,
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      pop: 0,
    },
    // 8. 오전 10시 - 맑음
    {
      dt: 1731908400,
      temp: 296.8, // 약 23.6°C
      feels_like: 296.9,
      pressure: 1016,
      humidity: 65,
      dew_point: 289.0,
      uvi: 4.0,
      clouds: 5,
      visibility: 10000,
      wind_speed: 3.8,
      wind_deg: 125,
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      pop: 0,
    },
    // 9. 오전 11시 - 기온 상승
    {
      dt: 1731912000,
      temp: 298.5, // 약 25.3°C
      feels_like: 298.6,
      pressure: 1015,
      humidity: 58,
      dew_point: 289.2,
      uvi: 5.5,
      clouds: 10,
      visibility: 10000,
      wind_speed: 4.0,
      wind_deg: 130,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      ],
      pop: 0,
    },
    // 10. 오후 12시 - 점심 시간
    {
      dt: 1731915600,
      temp: 300.1, // 약 26.9°C
      feels_like: 300.2,
      pressure: 1015,
      humidity: 52,
      dew_point: 289.4,
      uvi: 6.8,
      clouds: 15,
      visibility: 10000,
      wind_speed: 4.2,
      wind_deg: 135,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      ],
      pop: 0,
    },
    // 11. 오후 1시
    {
      dt: 1731919200,
      temp: 301.5, // 약 28.3°C
      feels_like: 301.8,
      pressure: 1014,
      humidity: 48,
      dew_point: 289.5,
      uvi: 7.2,
      clouds: 20,
      visibility: 10000,
      wind_speed: 4.5,
      wind_deg: 140,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      ],
      pop: 0,
    },
    // 12. 오후 2시 - 최고 기온
    {
      dt: 1731922800,
      temp: 302.2, // 약 29.0°C
      feels_like: 302.5,
      pressure: 1013,
      humidity: 45,
      dew_point: 289.6,
      uvi: 7.0,
      clouds: 25,
      visibility: 10000,
      wind_speed: 4.8,
      wind_deg: 145,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      ],
      pop: 0,
    },
    // 13. 오후 3시 - 여전히 더움
    {
      dt: 1731926400,
      temp: 302.0, // 약 28.8°C
      feels_like: 302.3,
      pressure: 1013,
      humidity: 46,
      dew_point: 289.6,
      uvi: 6.0,
      clouds: 30,
      visibility: 10000,
      wind_speed: 5.0,
      wind_deg: 150,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      pop: 0,
    },
    // 14. 오후 4시 - 구름 많아짐
    {
      dt: 1731930000,
      temp: 301.0, // 약 27.8°C
      feels_like: 301.5,
      pressure: 1013,
      humidity: 50,
      dew_point: 289.8,
      uvi: 4.5,
      clouds: 50,
      visibility: 10000,
      wind_speed: 5.2,
      wind_deg: 155,
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      pop: 0.1,
    },
    // 15. 오후 5시 - 기온 하강 시작
    {
      dt: 1731933600,
      temp: 299.5, // 약 26.3°C
      feels_like: 300.0,
      pressure: 1013,
      humidity: 55,
      dew_point: 290.0,
      uvi: 2.5,
      clouds: 60,
      visibility: 10000,
      wind_speed: 5.0,
      wind_deg: 160,
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      pop: 0.1,
    },
    // 16. 오후 6시 - 해 질 녘 (아이콘: day 유지 or night 직전)
    {
      dt: 1731937200,
      temp: 297.8, // 약 24.6°C
      feels_like: 298.2,
      pressure: 1014,
      humidity: 60,
      dew_point: 290.2,
      uvi: 1.0,
      clouds: 70,
      visibility: 10000,
      wind_speed: 4.5,
      wind_deg: 160,
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      pop: 0.2,
    },
    // 17. 오후 7시 - 일몰 후 (아이콘: night)
    {
      dt: 1731940800,
      temp: 296.2, // 약 23.0°C
      feels_like: 296.6,
      pressure: 1014,
      humidity: 65,
      dew_point: 290.4,
      uvi: 0,
      clouds: 75,
      visibility: 10000,
      wind_speed: 4.0,
      wind_deg: 155,
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      pop: 0.2,
    },
    // 18. 오후 8시
    {
      dt: 1731944400,
      temp: 295.0, // 약 21.8°C
      feels_like: 295.5,
      pressure: 1015,
      humidity: 70,
      dew_point: 290.5,
      uvi: 0,
      clouds: 80,
      visibility: 10000,
      wind_speed: 3.5,
      wind_deg: 150,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      pop: 0.2,
    },
    // 19. 오후 9시
    {
      dt: 1731948000,
      temp: 294.2, // 약 21.0°C
      feels_like: 294.8,
      pressure: 1015,
      humidity: 75,
      dew_point: 290.6,
      uvi: 0,
      clouds: 85,
      visibility: 10000,
      wind_speed: 3.2,
      wind_deg: 145,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      pop: 0.2,
    },
    // 20. 오후 10시
    {
      dt: 1731951600,
      temp: 293.5, // 약 20.3°C
      feels_like: 294.0,
      pressure: 1015,
      humidity: 78,
      dew_point: 290.7,
      uvi: 0,
      clouds: 80,
      visibility: 10000,
      wind_speed: 3.0,
      wind_deg: 140,
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      pop: 0.1,
    },
    // 21. 오후 11시
    {
      dt: 1731955200,
      temp: 293.0, // 약 19.8°C
      feels_like: 293.5,
      pressure: 1016,
      humidity: 80,
      dew_point: 290.8,
      uvi: 0,
      clouds: 70,
      visibility: 10000,
      wind_speed: 2.8,
      wind_deg: 135,
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      pop: 0,
    },
    // 22. 오전 12시 (다음날)
    {
      dt: 1731958800,
      temp: 292.5, // 약 19.3°C
      feels_like: 293.0,
      pressure: 1016,
      humidity: 82,
      dew_point: 290.8,
      uvi: 0,
      clouds: 60,
      visibility: 10000,
      wind_speed: 2.6,
      wind_deg: 130,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      pop: 0,
    },
    // 23. 오전 1시
    {
      dt: 1731962400,
      temp: 292.0, // 약 18.8°C
      feels_like: 292.5,
      pressure: 1016,
      humidity: 84,
      dew_point: 290.9,
      uvi: 0,
      clouds: 50,
      visibility: 10000,
      wind_speed: 2.5,
      wind_deg: 125,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      pop: 0,
    },
    // 24. 오전 2시
    {
      dt: 1731966000,
      temp: 291.6, // 약 18.4°C
      feels_like: 292.0,
      pressure: 1016,
      humidity: 85,
      dew_point: 290.9,
      uvi: 0,
      clouds: 40,
      visibility: 10000,
      wind_speed: 2.4,
      wind_deg: 120,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' },
      ],
      pop: 0,
    },
  ],

  daily: [
    {
      dt: 1731860400,
      sunrise: 1731860400,
      sunset: 1731898200,
      moonrise: 1731882000,
      moonset: 1731840000,
      moon_phase: 0.4,
      summary: 'Partly cloudy throughout the day.',
      temp: {
        day: 297.15,
        min: 289.5,
        max: 298.1,
        night: 290.1,
        eve: 295.2,
        morn: 290.8,
      },
      feels_like: {
        day: 297.3,
        night: 290.0,
        eve: 295.4,
        morn: 291.0,
      },
      pressure: 1016,
      humidity: 60,
      dew_point: 288.5,
      wind_speed: 3.0,
      wind_deg: 120,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      clouds: 40,
      pop: 0.1,
      uvi: 6.5,
    },

    {
      dt: 1731946800,
      sunrise: 1731946800,
      sunset: 1731984600,
      moonrise: 1731969000,
      moonset: 1731926400,
      moon_phase: 0.48,
      summary: 'Light rain expected in the morning.',
      temp: {
        day: 296.8,
        min: 288.9,
        max: 297.7,
        night: 289.4,
        eve: 295.6,
        morn: 289.2,
      },
      feels_like: {
        day: 297.0,
        night: 289.2,
        eve: 295.9,
        morn: 289.5,
      },
      pressure: 1014,
      humidity: 70,
      dew_point: 289.0,
      wind_speed: 4.5,
      wind_deg: 140,
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      ],
      clouds: 90,
      pop: 0.5,
      rain: 1.2,
      uvi: 5.8,
    },

    /* ... 총 7개의 daily 데이터 ... */
  ],

  alerts: [
    {
      sender_name: 'NWS Tulsa',
      event: 'Flood Watch',
      start: 1731879600,
      end: 1731922800,
      description:
        'Heavy rainfall expected. Flooding possible in low-lying areas.',
      tags: [],
    },
  ],
};

export const mockAirQualityRes: AirQualityResponse = {
  coord: [127.0, 37.5], // 위도, 경도
  list: [
    {
      dt: Math.floor(Date.now() / 1000), // 현재 시간의 유닉스 타임스탬프
      main: {
        aqi: 2, // Air Quality Index: 1=좋음, 2=보통, 3=나쁨, 4=매우 나쁨, 5=최악
      },
      components: {
        co: 447.52, // 일산화탄소 (μg/m³)
        no: 0.1, // 일산화질소 (μg/m³)
        no2: 24.51, // 이산화질소 (μg/m³)
        o3: 47.93, // 오존 (μg/m³)
        so2: 4.88, // 이산화황 (μg/m³)
        pm2_5: 18.0, // 초미세먼지 (μg/m³)
        pm10: 38.5, // 미세먼지 (μg/m³)
        nh3: 0.05, // 암모니아 (μg/m³)
      },
    },
  ],
};
