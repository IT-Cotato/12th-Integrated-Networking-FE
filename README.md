# FE-BE Networking 과제 6팀

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
> VITE_API_BASE_URL은 아직 백엔드에서 최종 엔드포인트를 제공하지 않았기 때문에  
> 나중에 백엔드 팀(API URL 확정)에서 알려주는 값으로 다시 업데이트해야 합니다

VITE_API_BASE_URL=

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

- 추후 추가 예정

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

## 브랜치 네이밍 규칙

브랜치를 생성할 때는 다음 규칙을 따르세요:

- **feature/기능명** - 새로운 기능 추가 시
  - 예: `feature/add-location-search`, `feature/weekly-forecast`
- **hotfix/버그명** - 급한 버그 수정 시
  - 예: `hotfix/api-error-handling`, `hotfix/critical-bug`
- **fix/수정명** - 작은 오류 수정 시
  - 예: `fix/typo-in-readme`, `fix/minor-ui-issue`

## 이슈 및 PR 템플릿

### 이슈 생성

새로운 이슈를 생성할 때는 `.github/ISSUE_TEMPLATE/` 폴더의 템플릿을 사용하세요:

- **🐞 Bug** - 버그/오류 리포트
- **✨ Feature** - 새로운 기능 개발 요청
- **🎨 UI/UX** - UI 버그 또는 UI 개선

이슈 생성 시 제목은 자동으로 접두사가 붙습니다:
- `[BUG] 버그 설명`
- `[FEAT] 기능 설명`
- `[UI] UI 개선 설명`

### Pull Request 생성

PR을 생성할 때는 `.github/PULL_REQUEST_TEMPLATE.md` 템플릿이 자동으로 적용됩니다. 다음 항목을 작성해주세요:

- 작업 내용 요약
- 상세 작업 내용 (체크리스트)
- 스크린샷 (UI 작업 시)
- 관련 이슈 번호
- 체크리스트 확인

PR 제목은 다음 형식을 권장합니다:
- `[feat] 기능 설명`
- `[fix] 수정 내용 설명`
- `[hotfix] 긴급 수정 내용 설명`

## 참고사항

- 피그마 디자인을 참고하여 레이아웃 및 스타일을 구현하세요
- `public/` 폴더의 SVG 아이콘을 날씨 상태에 따라 사용하세요
- 환경 변수는 `.env` 파일에 설정하고 Git에 커밋하지 마세요
