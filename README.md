> 12기 COTATO 프론트엔드-백엔드 네트워킹 과제 --> 프론트엔드
>
> 원본 레포지토리: [[전체 레포 링크](https://github.com/IT-Cotato/12th-Integrated-Networking-FE.git)]

## 👥 팀원

- **[신지예]** - 담당: 시간별/주간 예보
- **[허수빈]** - 담당: 메인 UI, API 연동

### 주요 기능

- ☀️ 실시간 날씨 정보
- 📊 시간별 날씨 예보 (24시간)
- 📅 주간 날씨 예보 (7일)
- 📍 위치 기반 날씨 검색
- 🔗 카카오 로그인 기능

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **API**: Kakao Map API
- **Deploy**: Vercel
- **Package Manager**: npm

## 🚀 실행 방법

### 1. 저장소 클론

```bash
git clone [fork된 레포 주소]
cd [프로젝트 폴더]
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 API 키를 입력하세요:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 4. 개발 서버 실행

```bash
npm start
```

에서 확인할 수 있습니다.

## 📂 프로젝트 구조

```
src/
├── components/            # React 컴포넌트
│   ├── Sidebar/           # 사이드바 메뉴
│   ├── MainWeatherPanel/  # 메인 날씨 정보
│   ├── HourlyForecast/    # 시간별 예보
│   ├── WeeklyForecast/    # 주간 예보
│   └── Modal/             # 모달 컴포넌트
├── hooks/                 # 커스텀 훅
├── services/              # API 서비스
├── types/                 # TypeScript 타입
└── utils/                 # 유틸리티 함수
```

## 💻 담당 작업

### [허수빈]

- [x] 프로젝트 초기 설정
- [x] Kakao Map API 연동
- [x] Modal 컴포넌트

### [신지예]

- [x] WeatherPanel 컴포넌트
- [x] HourlyForecast 컴포넌트
- [x] WeeklyForecast 컴포넌트

## 🤝 기여 방법

1. 이슈 생성
<<<<<<< HEAD
2. 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 푸시 (`git push origin feature/AmazingFeature`)
=======
2. 브랜치 생성
3. 커밋
4. 푸시
>>>>>>> 8f81fb55f1910b0d71aa09fd0946c0c875923203
5. Pull Request 생성

## 📚 참고 문서

- [Vite 공식 문서](https://vitejs.dev/)
<<<<<<< HEAD
- [Tailwind CSS v4](https://tailwindcss.com/)
=======
- [Tailwind CSS v4](https://tailwindcss.com/)
>>>>>>> 8f81fb55f1910b0d71aa09fd0946c0c875923203
