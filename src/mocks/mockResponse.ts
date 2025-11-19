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
    {
      dt: 1731883200,
      temp: 292.15,
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
    {
      dt: 1731886800,
      temp: 291.7,
      feels_like: 291.9,
      pressure: 1015,
      humidity: 84,
      dew_point: 288.0,
      uvi: 0,
      clouds: 22,
      visibility: 10000,
      wind_speed: 2.6,
      wind_deg: 105,
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' },
      ],
      pop: 0,
    },
    /* ... 같은 구조로 24개까지 채워짐 ... */
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
