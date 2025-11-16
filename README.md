# 날씨 앱 프로젝트

React + TypeScript + Vite로 구현한 날씨 정보 애플리케이션입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **TanStack Query** - 서버 상태 관리
- **Framer Motion** - 애니메이션
- **Recharts** - 차트 라이브러리
- **Axios** - HTTP 클라이언트
- **카카오맵 API** - 장소 검색

## 프로젝트 구조

```
src/
├── components/          # 컴포넌트
│   ├── Sidebar/         # 좌측 사이드바
│   ├── WeatherPanel/    # 메인 날씨 정보 패널
│   ├── HourlyForecast/  # 시간별 예보
│   ├── WeeklyForecast/  # 주간 예보
│   └── Modal/           # 모달 컴포넌트
├── hooks/               # 커스텀 훅
├── services/            # API 서비스
├── types/               # TypeScript 타입 정의
└── utils/               # 유틸리티 함수
```

## 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 백엔드 API 기본 URL
VITE_API_BASE_URL=http://localhost:3000/api

# 카카오맵 API 키
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

### 4. 빌드

```bash
pnpm build
```

## 주요 기능

### 1. 위치 관리
- 위치 목록 표시 및 선택
- 카카오맵 API를 통한 장소 검색 및 추가
- 위치 삭제 기능
- 로컬 스토리지를 통한 위치 목록 영구 저장

### 2. 날씨 정보 표시
- 현재 온도 및 날씨 상태
- 체감온도, 습도, 풍속 등 부가 정보
- 미세먼지/초미세먼지 정보 (상태별 색상 표시)
- 날씨 상태에 따른 아이콘 및 배경색 동적 변경

### 3. 시간별 예보
- 12시간 단위 시간별 날씨 예보
- 스크롤 또는 버튼을 통한 24시간 내 예보 조회
- 그래프 및 타임라인 형태로 표시

### 4. 주간 예보
- 5일치 일별 예보 카드 형태
- 오전/오후 구분, 아이콘, 강수확률, 온도 표시

### 5. 모달
- 위치 추가 모달 (Framer Motion 애니메이션)
- 위치 삭제 확인 모달 (Framer Motion 애니메이션)

## API 연동

### 백엔드 API

날씨 데이터는 백엔드 API를 통해 가져옵니다. 다음 엔드포인트를 구현해야 합니다:

- 추후 추가 예정정

### 카카오맵 API

카카오맵 JavaScript API 키가 필요합니다. [카카오 개발자 콘솔](https://developers.kakao.com/)에서 발급받을 수 있습니다.

## 개발 가이드

### 컴포넌트 추가

새 컴포넌트는 `src/components/` 디렉토리에 추가하세요.

### 타입 정의

모든 타입은 `src/types/index.ts`에 정의하세요.

### API 호출

API 호출은 `src/services/` 디렉토리의 서비스 파일을 통해 이루어집니다.

### 상태 관리

- 서버 상태: TanStack Query 사용
- 클라이언트 상태: React useState, 커스텀 훅 사용
- 위치 목록: 로컬 스토리지 사용

## 참고사항

- 피그마 디자인을 참고하여 레이아웃 및 스타일을 구현하세요
- `public/` 폴더의 SVG 아이콘을 날씨 상태에 따라 사용하세요
- 환경 변수는 `.env` 파일에 설정하고 Git에 커밋하지 마세요
