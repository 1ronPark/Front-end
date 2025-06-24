# 🧩 Front-end Repository

IronPark 프로젝트의 프론트엔드 저장소입니다.  
React + TypeScript 기반의 모듈형 구조로 구성되어 있으며, 기능 단위 브랜치 전략과 커밋 컨벤션을 따릅니다.

---

## 🚀 Getting Started

```bash
# 의존성 설치
yarn

# 개발 서버 실행
yarn dev

```
--- 
## ⚙️ 기술 스택

| 구분     | 내용                                 |
|----------|--------------------------------------|
| core     | React, TypeScript                   |
| style    | Tailwind CSS                        |
| state    | Tanstack Query, Zustand             |
| network  | axios                                |
| tool     | Yarn                                 |
| deploy   | GitHub Pages (예정)                 |

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
- `feature/기능명`: 기능 개발 단위 브랜치
- `fix/버그명`: 버그 수정 브랜치
- `hotfix/패치명`: 긴급 패치 브랜치

> ⚠️ 모든 커밋은 Pull Request(PR) 기반으로 `develop`에 병합합니다.

---

## 👨‍👩‍👧‍👦 협업 규칙

- 커밋 컨벤션 및 브랜치 전략을 반드시 지켜주세요.
- PR 생성 시 **리뷰어 지정 및 라벨 설정**은 필수입니다.
- 모든 PR은 **팀원 모두 리뷰 승인** 후 병합 가능합니다.

---

## 📁 디렉토리 구조 (예시)


