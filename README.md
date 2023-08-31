# Git Issue Navigator

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white"/>
</p>

## ❤️ 프로젝트 내용

GitHub REST API를 활용해 특정 Repository에 대한 Issue를 볼 수 있는 서비스

## 🌱 배포 및 제작 기간

- 배포 링크 : [Git Issue Navigator](git-issue-navigator.vercel.app)
- 제작 기간 : 2023.08.29. ~ 2023.08.31 (3일)

## 🚀 실행 방법

```
$ git clone https://github.com/YeongseoYoon/git-issue-navigator.git
$ npm install
$ npm start
```

## 📁 디렉토리 구조

```
 📦src
 ┣ 📂apis
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂Issue
 ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜Layout.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┗ 📜RouteErrorBoundary.tsx
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂detail
 ┃ ┗ 📂home
 ┣ 📂router
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

## 🛠️ 구현 기능

1. 에러바운더리(라우팅 및 비동기 에러제어)
2. 로딩 페이지
3. api 호출해 목록 / 상세 페이지 구현
4. 광고 이미지 호출
5. 무한 스크롤 구현
