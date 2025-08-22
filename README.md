# 🧩 Front-end Repository
![Poster (1)](https://github.com/user-attachments/assets/1f63860c-de92-412c-9938-6dfa530a7273)

LightUp의 프론트엔드 저장소입니다.  
React + TypeScript 기반의 모듈형 구조로 구성되어 있으며, 기능 단위 브랜치 전략과 커밋 컨벤션을 따릅니다.

---
--- 
## ⚙️ 기술 스택

| 구분     | 내용                                 |
|----------|--------------------------------------|
| core     | React, TypeScript                   |
| style    | Tailwind CSS                        |
| state    | Tanstack Query, Zustand             |
| network  | axios                                |
| tool     | Yarn                                 |
| deploy   | Vercel                 |

---

## 🏷️ 커밋 컨벤션

모든 커밋 메시지는 아래와 같은 규칙을 따릅니다:
### 🎯 타입 목록

| 타입     | 설명                             |
|----------|----------------------------------|
| feat     | 새로운 기능 추가                 |
| fix      | 버그 수정                        |
| refactor | 리팩토링 (기능 변화 없음)        |
| style    | 코드 스타일 (공백, 세미콜론 등)  |
| docs     | 문서 수정 (README 등)            |
| chore    | 기타 설정 변경, 빌드 작업 등     |
| test     | 테스트 코드 추가 및 수정         |

---

## 🌿 브랜치 전략

- `main`: 배포용 브랜치 (리뷰 및 테스트 완료된 코드만 병합)
- `feature:기능명`: 기능 개발 단위 브랜치
- `fix:버그명`: 버그 수정 브랜치
- `hotfix:패치명`: 긴급 패치 브랜치

> ⚠️ 모든 커밋은 Pull Request(PR) 기반으로 `develop`에 병합합니다.

---

## 👨‍👩‍👧‍👦 협업 규칙

- 커밋 컨벤션 및 브랜치 전략을 반드시 지켜주세요.
- PR 생성 시 **리뷰어 지정 및 라벨 설정**은 필수입니다.
- 모든 PR은 **팀원 모두 리뷰 승인** 후 병합 가능합니다.

---

# 📁 프로젝트 구조 (slu_front)

<pre>
slu_front/
├── .github/               # GitHub 워크플로우 설정
├── .vercel/               # Vercel 배포 관련 설정
├── dist/                  # 빌드 결과물
├── mockData/              # 테스트용 목 데이터
├── node_modules/          # 설치된 패키지
├── public/                # 정적 파일들 (favicon, 이미지 등)
├── src/                   # 소스 코드 루트
│   ├── assets/            # 이미지, 폰트 등 에셋
│   ├── components/        # 공통 및 페이지 컴포넌트
│   ├── constants/         # 상수 정의
│   ├── data/              # 더미 데이터 또는 JSON
│   ├── hooks/             # 커스텀 훅
│   ├── lib/               # 외부 라이브러리/유틸 모듈
│   ├── pages/             # 라우팅 페이지
│   ├── queries/           # Tanstack Query 관련 쿼리 정의
│   ├── store/             # Zustand 등 상태 관리
│   ├── types/             # TypeScript 타입 정의
│   └── utils/             # 유틸 함수들
│   ├── App.tsx            # 최상위 컴포넌트
│   ├── main.tsx           # 엔트리 포인트
│   ├── index.css          # 글로벌 스타일
│   └── vite-env.d.ts      # Vite 환경 설정 타입
├── .env                   # 환경 변수 설정
├── .env.preview           # preview 환경 변수
├── .gitignore             # Git 무시 파일
├── eslint.config.js       # ESLint 설정
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 설정 및 스크립트
├── package-lock.json      # 종속성 lock 파일
├── tsconfig.json          # TypeScript 컴파일러 설정
├── tsconfig.app.json      # App용 tsconfig 설정
└── README.md              # 프로젝트 설명 문서
</pre>



