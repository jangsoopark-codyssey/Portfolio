# 나를 소개하는 웹페이지 처음부터 만들기

## Overview

```plaintext
Portfolio/
├─ index.html
├─ assets/
│  └─ images/
│     └─ profile.jpg
├─ css/
│  ├─ variables.css
│  └─ style.css
├─ js/
│  ├─ main.js
│  ├─ content.js
│  ├─ github.js
│  └─ contact.js
├─ data/
│  └─ content.json
└─ README.md
```

| 경로                          | 역할              | 책임                                                                                                  |
| --------------------------- | --------------- | --------------------------------------------------------------------------------------------------- |
| `index.html`                | 페이지 구조 정의       | Header, Hero, About, Skills, Projects, Contact, Footer 등 semantic HTML 구조를 정의하고 CSS/JS 연결           |
| `assets/`                   | 정적 리소스 보관       | 이미지, 아이콘 등 코드가 아닌 정적 파일 관리                                                                          |
| `assets/images/profile.jpg` | 프로필 이미지         | About 섹션에서 사용하는 프로필 이미지                                                                             |
| `css/variables.css`         | 디자인 토큰 정의       | 폰트, 색상, 크기, 간격, 버튼 크기 등 반복 사용하는 CSS 공통 값 관리                                                         |
| `css/style.css`             | UI 스타일 구현       | Mobile First 레이아웃, Typography, Header, Hero, About, Skills, Projects, Contact, Footer, 상태 UI 스타일 관리 |
| `js/main.js`                | 애플리케이션 진입점      | 콘텐츠 로딩, 각 섹션 렌더링 호출, Navigation/Top Button 등 UI 초기화 및 전체 실행 흐름 관리                                   |
| `js/content.js`             | 정적 콘텐츠 로딩/렌더링   | `content.json` fetch, version 검증, Site/Hero/About/Skills/Projects Heading/Contact/Footer 렌더링        |
| `js/github.js`              | GitHub API 처리   | GitHub Repository API 호출, Projects의 Loading/Success/Error/Empty 상태 관리 및 프로젝트 카드 렌더링                 |
| `js/contact.js`             | Contact Form 처리 | Submit 이벤트, 이름/이메일/메시지 유효성 검사, 에러 및 성공 상태 DOM 업데이트                                                  |
| `data/content.json`         | 콘텐츠 데이터 저장      | Site metadata, Navigation, Hero, About, Skills, Projects 설정, Contact, Footer 등 변경 가능한 콘텐츠 관리        |

## Table of Contents

## Question

- Differnece between `==` and `===` in javascript
- What is replaceChildren(·) ?