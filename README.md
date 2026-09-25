# 나를 소개하는 웹페이지 처음부터 만들기

## Overview

```plaintext
Portfolio/
├─ index.html
├─ assets/
├─ css/
│  ├─ variables.css
│  └─ style.css
├─ js/
│  ├─ main.js
│  └─ content.js
├─ data/
│  └─ content.json
└─ README.md
```

| 경로                  | 역할           | 책임                                                                                       |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `index.html`        | 페이지 구조 정의    | Header, Hero, About, Skills, Projects, Contact, Footer 등 semantic HTML 구조를 정의하고 CSS/JS를 연결 |
| `assets/`           | 정적 리소스 보관    | 이미지, 아이콘, PDF 등 코드가 아닌 파일 관리                                                               |
| `css/variables.css` | 디자인 토큰 정의    | 폰트, 색상, 크기, 간격, 최대 너비 등 반복해서 사용하는 공통 값을 CSS 변수로 관리                                         |
| `css/style.css`     | 실제 UI 스타일 구현 | Mobile First 기준의 레이아웃, typography, component 스타일, responsive media query 작성                |
| `js/main.js`        | 애플리케이션 진입점   | 페이지 초기화, 콘텐츠 로딩 호출, 이벤트 등록 등 전체 실행 흐름 관리                                                   |
| `js/content.js`     | 콘텐츠 로딩/렌더링   | `content.json`을 읽고 HTML 요소에 데이터를 반영                                                        |
| `data/content.json` | 콘텐츠 데이터 저장   | Hero 문구, About 소개, Skills, Projects 등 변경 가능한 콘텐츠 관리                                        |


## Table of Contents

## Question

- Differnece between `==` and `===` in javascript
- What is replace Children