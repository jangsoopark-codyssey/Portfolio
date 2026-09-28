# Personal Portfolio Website

순수 HTML, CSS, JavaScript를 이용하여 제작한 반응형 개인 포트폴리오 웹사이트이다.

외부 프레임워크나 UI 라이브러리를 사용하지 않고,
HTML 문서 구조, CSS Layout, JavaScript Event와 DOM Manipulation,
비동기 Network 요청 등 웹의 기본 동작을 직접 구현하는 것을 목표로 하였다.

개발은 Mobile First 방식으로 진행하였으며,
Mobile 환경에서 구조와 주요 기능을 완성한 뒤
Tablet과 Desktop 환경으로 UI를 단계적으로 확장하였다.


## 목차

1. [과제 개요](#1-과제-개요)
   - [1.1 결과물](#11-결과물)
   - [1.2 접속 URL](#12-접속-url)
   - [1.3 프로젝트 구조](#13-프로젝트-구조)
   - [1.4 실행 방법](#14-실행-방법)
2. [요구사항 구현](#2-요구사항-구현)
   - [2.1 필수 요구사항](#21-필수-요구사항)
   - [2.2 보너스 요구사항](#22-보너스-요구사항)
3. [개발 과정](#3-개발-과정)
   - [3.1 Wireframe](#31-wireframe)
   - [3.2 Mobile First](#32-mobile-first)
   - [3.3 Tablet](#33-tablet)
   - [3.4 Desktop](#34-desktop)
   - [3.5 Mobile First의 장점](#35-mobile-first의-장점)
4. [주요 개념](#4-주요-개념)
   - [4.1 Semantic HTML](#41-semantic-html)
   - [4.2 Flexbox와 Grid](#42-flexbox와-grid)
   - [4.3 DOM 선택과 이벤트 처리](#43-dom-선택과-이벤트-처리)
   - [4.4 Event → State → DOM Update](#44-event--state--dom-update)
   - [4.5 ES6 JavaScript](#45-es6-javascript)
   - [4.6 비동기 처리와 Fetch API](#46-비동기-처리와-fetch-api)
   - [4.7 웹과 브라우저의 동작 원리](#47-웹과-브라우저의-동작-원리)


## 1. 과제 개요

본 과제의 목표는 HTML, CSS, JavaScript만을 이용하여
Mobile, Tablet, Desktop 환경에 대응하는 개인 포트폴리오 웹사이트를 구현하는 것이다.

단순한 정적 페이지 구성에 그치지 않고,
사용자 Event와 JavaScript를 이용하여 화면의 상태가 동적으로 변경되는 구조를 구현하였다.

주요 구성 영역은 다음과 같다.

- Hero
- About
- Skills
- Projects
- Contact
- Footer
- Responsive Navigation
- Light / Dark Theme
- GitHub API Integration
- Contact Form Validation and Submission
- Scroll-based Interaction


### 1.1 결과물

최종 결과물은 Mobile, Tablet, Desktop 환경에 대응하는
Responsive Portfolio Website이다.

#### Mobile

<details>

<summary>Screenshot</summary>

![Mobile](./assets/results/01.mobile-01.png)
![Mobile](./assets/results/01.mobile-02-menu.png)
![Mobile](./assets/results/01.mobile-03-theme.png)
![Mobile](./assets/results/01.mobile-04-about.png)
![Mobile](./assets/results/01.mobile-05-skills.png)
![Mobile](./assets/results/01.mobile-06-projects.png)
![Mobile](./assets/results/01.mobile-07-contact.png)

</details>

#### Tablet

<details>

<summary>Screenshot</summary>

![Tablet](./assets/results/02.tablet-01.png)
![Tablet](./assets/results/02.tablet-02-theme.png)
![Tablet](./assets/results/02.tablet-03-about.png)
![Tablet](./assets/results/02.tablet-04-skills.png)
![Tablet](./assets/results/02.tablet-05-projects.png)
![Tablet](./assets/results/02.tablet-06-contact.png)

</details>

#### Desktop

<details>

<summary>Screenshot</summary>

![Tablet](./assets/results/03.desktop-01.png)
![Tablet](./assets/results/03.desktop-02-about.png)
![Tablet](./assets/results/03.desktop-03-skills.png)
![Tablet](./assets/results/03.desktop-04-projects.png)
![Tablet](./assets/results/03.desktop-05-contact.png)

</details>


### 1.2 접속 URL

GitHub Pages를 이용하여 배포하였다.

https://jangsoopark-codyssey.github.io/Portfolio/


### 1.3 프로젝트 구조

프로젝트는 HTML, CSS, JavaScript, Data, Asset의 역할을 분리하여 구성하였다.

```text
Portfolio/
├─ index.html
├─ favicon.ico
├─ assets/
│  └─ images/
│     ├─ profile.png
│     └─ profile-dark.png
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
├─ scripts/
│  └─ run.sh
└─ README.md
```

| 파일 | 역할 |
| --- | --- |
| `index.html` | 전체 문서 구조와 Semantic Layout 정의 |
| `css/variables.css` | Font, Color, Spacing 등의 Design Token 관리 |
| `css/style.css` | Mobile First 기반 Style과 Responsive Layout 정의 |
| `js/main.js` | Application 초기화 및 주요 Event 연결 |
| `js/content.js` | `content.json` Load 및 정적 Content Rendering |
| `js/github.js` | GitHub API 요청, Project Rendering, Filtering 및 Error Handling |
| `js/contact.js` | Contact Form Validation 및 Formspree 전송 처리 |
| `data/content.json` | Portfolio Content와 설정 정보 관리 |
| `assets/images/` | Profile Image 등의 정적 Asset 관리 |
| `scripts/run.sh` | Local HTTP Server 실행 |
| `favicon.ico` | Browser Tab에 표시되는 Site Icon |

Content를 HTML에 직접 모두 작성하지 않고
`content.json`으로 분리하여
Content와 UI 구조를 독립적으로 관리하도록 구성하였다.


### 1.4 실행 방법

본 프로젝트는 `content.json`을 `fetch()`를 통해 불러오기 때문에
`index.html`을 `file://` 방식으로 직접 실행하지 않고
HTTP Server 환경에서 실행한다.

Project Root를 기준으로 `scripts` Directory로 이동한다.

```bash
cd scripts
```

실행 Script를 실행한다.

```bash
./run.sh
```

Local 개발 환경에서는 Python의 내장 `http.server` Module을 사용한다.

실행 후 Browser에서 Local Server 주소로 접속하여 결과를 확인한다.


## 2. 요구사항 구현

본 프로젝트는 과제에서 제시한 필수 요구사항과
보너스 요구사항을 기준으로 구현하였다.

기능을 단순히 추가하는 데 그치지 않고,
각 요구사항을 HTML 구조, CSS Layout,
JavaScript Event 처리와 연결하여 구성하였다.


### 2.1 필수 요구사항

| 요구사항 | 구현 내용 |
| --- | --- |
| Hero | Main Text, Sub Text, `See My Work`, `Get in Touch` CTA 구성 |
| About | Profile Image와 소개 문구 구성 |
| Skills | 기술 분야별 Card와 Stack Tag 구성 |
| Projects | GitHub REST API를 이용하여 Repository 목록을 동적으로 출력 |
| Contact | Name, Email, Message 입력 Form 구성 |
| Footer | GitHub, LinkedIn Link와 Copyright 정보 구성 |
| Responsive Layout | Mobile First 방식으로 Mobile → Tablet → Desktop 순서로 확장 |
| Mobile Navigation | Hamburger Menu를 이용한 Navigation 열기 및 닫기 구현 |
| Smooth Scroll | Navigation 및 CTA 클릭 시 Section으로 부드럽게 이동 |
| Header Scroll State | 일정 위치 이상 Scroll 시 Header Style 변경 |
| Scroll-to-Top | 일정 Scroll 위치 이후 Top Button 표시 |
| Dark Mode | `data-theme`과 CSS Variable을 이용한 Light / Dark Theme 구현 |
| Theme Persistence | `localStorage`를 이용하여 사용자가 선택한 Theme 유지 |
| Scroll Animation | `IntersectionObserver`를 이용한 Section 등장 Animation 구현 |
| GitHub API | `fetch()`와 `async/await`을 이용하여 Repository 정보 조회 |
| API State UI | Loading, Success, Empty, Error, Retry 상태를 구분하여 표현 |
| Form Validation | 필수 입력값과 Email 형식을 JavaScript에서 검증 |
| Semantic HTML | `header`, `nav`, `main`, `section`, `article`, `footer` 등의 Semantic Tag 사용 |
| JavaScript Event | `addEventListener()`를 이용하여 사용자 Event 처리 |
| DOM Manipulation | `querySelector`, `classList`, `textContent`, `replaceChildren` 등을 이용하여 UI 변경 |

GitHub Projects 영역은 API 요청 결과에 따라
Loading, Success, Empty, Error 상태를 각각 구분하여 처리하였다.

API 요청에 실패한 경우에는 Retry Button을 제공하여
사용자가 동일한 요청을 다시 수행할 수 있도록 구성하였다.

Contact Form에서는 Browser 기본 Validation에 의존하지 않고,
JavaScript를 이용하여 Name, Email, Message를 직접 검증하였다.

검증에 실패한 경우 해당 입력 영역 인근에 Error Message를 출력하고,
모든 Validation을 통과한 경우에만 Form 전송 과정으로 진행하도록 구성하였다.


### 2.2 보너스 요구사항

필수 요구사항 구현 이후,
추가적인 사용자 경험과 JavaScript 활용을 위해
보너스 요구사항도 함께 구현하였다.

| 보너스 요구사항 | 구현 내용 |
| --- | --- |
| Project Filtering | GitHub Repository를 Language 기준으로 Filtering |
| Typing Effect | Hero Main Text에 Typing Animation 적용 |
| Contact Form Submission | Formspree를 이용하여 실제 Message 전송 구현 |
| System Dark Mode | `prefers-color-scheme`을 이용하여 운영체제 Theme 설정 감지 |

#### Project Filtering

GitHub API를 통해 가져온 Repository 목록에서
각 Repository의 `language` 정보를 이용하여 Filter Button을 동적으로 생성하였다.

사용자가 특정 Language를 선택하면
새로운 API 요청을 수행하지 않고,
기존 Repository 배열에 `filter()`를 적용하여 해당 Language의 Project만 다시 렌더링한다.

```javascript
const filteredProjects = projects.filter((project) => {
    return project.language === language;
});
```

이를 통해 API 요청과 화면 렌더링의 역할을 분리하고,
이미 가지고 있는 데이터를 상태에 따라 다시 표현하도록 구성하였다.


#### Typing Effect

Hero Section의 Main Text에는 JavaScript 기반 Typing Effect를 적용하였다.

`content.json`으로부터 렌더링된 전체 문자열을 저장한 뒤,
일정한 시간 간격으로 한 글자씩 DOM에 추가하는 방식으로 구현하였다.

Animation이 필요하지 않은 사용자를 고려하여
`prefers-reduced-motion`이 활성화된 환경에서는
Typing Effect를 실행하지 않도록 구성하였다.


#### Contact Form Submission

기본 요구사항에서는 Contact Form의 Validation을 구현하였으며,
보너스 기능에서는 Formspree를 이용하여 실제 Message 전송 기능을 추가하였다.

Form Validation을 통과하면 `fetch()`를 이용하여
Formspree Endpoint로 Name, Email, Message를 전송한다.

전송 과정에서는 다음 UI 상태를 구분하였다.

- Sending
- Success
- Error

전송 중에는 Submit Button을 비활성화하고,
성공한 경우 입력 내용을 초기화하며 Success Message를 출력한다.

전송에 실패한 경우에는 Error Message를 출력하여
사용자가 현재 상태를 확인할 수 있도록 구성하였다.


#### System Dark Mode

기본 Dark Mode 기능에서는 사용자가 선택한 Theme를
`localStorage`에 저장하여 새로고침 이후에도 유지하도록 구현하였다.

추가적으로 `prefers-color-scheme` Media Query를 이용하여
운영체제의 Light / Dark Mode 설정도 감지하도록 확장하였다.

Theme 결정 우선순위는 다음과 같다.

1. 사용자가 직접 선택하여 `localStorage`에 저장된 Theme
2. 운영체제의 `prefers-color-scheme`
3. 기본 Light Theme

사용자가 직접 Theme를 선택한 경우에는
운영체제 설정보다 사용자의 선택을 우선하도록 구성하였다.

Light Theme와 Dark Theme에서는
서로 다른 Profile Image를 사용하여
각 Theme의 배경과 이미지가 자연스럽게 조화되도록 구성하였다.


## 3. 개발 과정

개발은 Wireframe 설계 이후 Mobile 환경을 기준으로 기능을 먼저 완성하고,
Tablet과 Desktop 환경으로 UI를 확장하는 순서로 진행하였다.

JavaScript 기능은 가능한 한 화면 크기와 분리하여 구현하고,
반응형 대응은 CSS Media Query를 중심으로 처리하였다.


### 3.1 Wireframe

구현에 앞서 Mobile, Tablet, Desktop 환경에서 필요한
페이지 구조와 주요 UI 요소의 배치를 Wireframe으로 설계하였다.

Wireframe 단계에서는 세부 색상이나 Style보다
각 Section의 순서와 정보 구조,
화면 크기에 따른 Layout 변화에 집중하였다.

주요 Section은 다음과 같이 구성하였다.

- Header
- Hero
- About
- Skills
- Projects
- Contact
- Footer

Mobile에서는 제한된 화면 폭을 고려하여
대부분의 Content를 Single Column 형태로 배치하였다.

Tablet과 Desktop에서는 화면 폭이 넓어짐에 따라
Navigation을 가로 형태로 확장하고,
Skills와 Projects를 Multi-Column Layout으로 변경하도록 계획하였다.

#### Mobile

![Mobile](./assets/wireframe/Mobile.png)

#### Tablet

![Tablet](./assets/wireframe/Tablet.png)

#### Desktop

![Desktop](./assets/wireframe/Desktop.png)

### 3.2 Mobile First

실제 구현은 Mobile 환경부터 시작하였다.

Mobile 단계에서는 단순히 화면 크기만 줄이는 것이 아니라,
HTML 구조와 JavaScript 기능을 먼저 완성하는 것을 목표로 하였다.

주요 구현 기능은 다음과 같다.

- Hamburger Navigation
- Navigation 외부 클릭 시 Menu 닫기
- Smooth Scroll
- Scroll-to-Top Button
- Header Scroll State
- Light / Dark Theme
- Theme Persistence
- System Theme Detection
- GitHub Project Loading
- Project Filtering
- Contact Form Validation
- Contact Form Submission
- Scroll Reveal Animation
- Hero Typing Effect

Mobile 환경에서 주요 기능을 먼저 완성한 뒤,
Tablet과 Desktop 단계에서는 동일한 HTML 구조와 JavaScript 기능을 유지하면서
CSS를 중심으로 Layout을 확장하였다.


### 3.3 Tablet

Tablet Layout은 `768px` 이상을 기준으로 구성하였다.

```css
@media (min-width: 768px) {
    /* Tablet Layout */
}
```

Mobile에서 사용하던 Hamburger Navigation을 숨기고,
Navigation Menu를 Header 내부에 가로 형태로 표시하였다.

화면 폭이 넓어진 만큼 다음과 같이 Layout을 확장하였다.

- Hero CTA를 세로 배치에서 가로 배치로 변경
- Profile Image 크기 확대
- Skills를 1열에서 2열 Grid로 변경
- Projects를 1열에서 2열 Grid로 변경
- Contact Form의 최대 폭을 제한하여 중앙 정렬
- Section Padding과 Typography 확대

기능 자체는 Mobile 단계의 구현을 그대로 사용하고,
화면 배치와 크기만 CSS Media Query를 이용하여 변경하였다.


### 3.4 Desktop

Desktop Layout은 `1024px` 이상을 기준으로 구성하였다.

```css
@media (min-width: 1024px) {
    /* Desktop Layout */
}
```

Desktop 환경에서는 넓은 화면을 그대로 모두 사용하지 않고,
Content의 최대 폭을 제한하여 중앙에 배치하였다.

```css
max-width: var(--content-max-width);
margin-inline: auto;
```

이를 통해 대형 모니터에서도
Text와 Card가 지나치게 넓게 퍼지는 것을 방지하였다.

주요 Layout 변화는 다음과 같다.

- Header Content를 본문과 동일한 최대 폭 기준으로 정렬
- Hero Typography 확대
- Profile Image 확대
- Skills를 4열 Grid로 변경
- Projects를 3열 Grid로 변경
- About 및 Contact 영역의 최대 폭 조정
- Section 간 여백 확대

Header에는 `.header-inner` Wrapper를 사용하여
전체 Header Background와 실제 Header Content의 영역을 분리하였다.

Header Background와 Border는 Browser 전체 폭을 사용하고,
Logo, Navigation, Theme Switch는
본문과 동일한 Content Width 안에서 배치하였다.


### 3.5 Mobile First의 장점

Mobile First 방식은 제한된 화면에서
가장 중요한 정보와 기능을 먼저 결정할 수 있다는 장점이 있다.

본 프로젝트에서는 기본 CSS를 Mobile 환경에 맞추어 작성하고,
화면이 넓어질수록 Media Query를 통해 Layout을 확장하였다.

이를 통해 Desktop 중심으로 작성한 Style을
Mobile 환경에서 다시 축소하거나 덮어쓰는 작업을 줄일 수 있었다.

또한 JavaScript 기능을 Mobile 단계에서 먼저 완성한 뒤
Tablet과 Desktop에서는 Layout만 확장하였기 때문에,
화면 크기별로 별도의 기능 구현이 발생하지 않았다.

결과적으로 다음과 같은 구조를 유지할 수 있었다.

```text
하나의 HTML 구조
        +
하나의 JavaScript 기능
        +
화면 크기에 따른 CSS Layout 확장
```

이 방식은 기능과 Layout의 역할을 분리하고,
반응형 웹의 구조를 보다 단순하게 유지하는 데 도움이 되었다.


## 4. 주요 개념

본 프로젝트에서는 단순히 화면을 구성하는 것을 넘어,
HTML 구조, CSS Layout, JavaScript Event,
DOM Manipulation, 비동기 처리와 Browser Rendering의 흐름을 직접 구현하였다.

각 개념은 독립적으로 사용되는 것이 아니라,
사용자 입력이 발생하고 상태가 변경되며
화면이 다시 표현되는 전체 흐름 안에서 연결된다.


### 4.1 Semantic HTML

Semantic HTML은 Tag 이름 자체가
해당 영역의 의미와 역할을 나타내는 HTML 작성 방식이다.

본 프로젝트에서는 다음과 같은 Semantic Tag를 사용하였다.

- `<header>`: 페이지 상단의 Logo, Navigation, Theme Control 영역
- `<nav>`: 주요 Section으로 이동하기 위한 Navigation 영역
- `<main>`: 페이지의 핵심 Content 영역
- `<section>`: Hero, About, Skills, Projects, Contact와 같은 독립된 Section
- `<article>`: 각각의 Project Card처럼 독립적인 의미를 가지는 Content
- `<footer>`: 외부 Link와 Copyright 정보 영역

단순히 모든 영역을 `<div>`로 구성할 수도 있지만,
Semantic Tag를 사용하면 HTML 구조만 확인해도
각 영역의 역할을 파악하기 쉽다.

또한 Screen Reader와 같은 보조 기술이
문서 구조를 이해하는 데에도 도움이 된다.

본 프로젝트에서는 다음과 같은 기준으로 구조를 설계하였다.

```text
페이지 전체 구조
├─ header
│  └─ nav
├─ main
│  ├─ section: Hero
│  ├─ section: About
│  ├─ section: Skills
│  ├─ section: Projects
│  │  └─ article: Project
│  └─ section: Contact
└─ footer
```

Tag 선택 기준은 단순한 시각적 배치가 아니라
해당 Content가 문서 안에서 어떤 의미와 역할을 가지는지를 기준으로 하였다.


### 4.2 Flexbox와 Grid

Flexbox와 Grid는 모두 CSS Layout을 구성하기 위한 기능이지만,
적합한 사용 목적이 다르다.

#### Flexbox

Flexbox는 주로 한 방향으로 요소를 배치할 때 사용하였다.

본 프로젝트에서는 다음 영역에 활용하였다.

- Header
- Navigation
- Hero CTA
- Skill Stack Tag
- Project Filter
- Contact Form

예를 들어 Header에서는 Logo, Navigation, Theme Switch를
가로 방향으로 정렬하기 위해 Flexbox를 사용하였다.

```css
.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

#### Grid

Grid는 여러 행과 열로 구성되는 Layout에 사용하였다.

본 프로젝트에서는 Skills와 Projects 영역에 적용하였다.

Mobile에서는 한 개의 Column을 사용하고,
Tablet과 Desktop에서는 화면 크기에 따라 Column 수를 증가시켰다.

```css
#skills-list {
    display: grid;
    grid-template-columns: 1fr;
}
```

Tablet에서는 다음과 같이 2열로 확장하였다.

```css
#skills-list {
    grid-template-columns: repeat(2, 1fr);
}
```

Desktop에서는 4열로 확장하였다.

```css
#skills-list {
    grid-template-columns: repeat(4, 1fr);
}
```

따라서 본 프로젝트에서는 다음 기준으로 Flexbox와 Grid를 선택하였다.

```text
한 방향의 정렬과 배치
→ Flexbox

행과 열을 함께 사용하는 Card Layout
→ Grid
```


### 4.3 DOM 선택과 이벤트 처리

JavaScript에서 HTML 요소를 조작하기 위해서는
먼저 해당 DOM Element를 선택해야 한다.

본 프로젝트에서는 `querySelector()`를 이용하여 필요한 Element를 선택하였다.

```javascript
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
```

선택한 Element에는 `addEventListener()`를 이용하여
사용자 Event를 연결하였다.

```javascript
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});
```

전체 흐름은 다음과 같다.

```text
DOM Element 선택
        ↓
querySelector()
        ↓
Event Listener 등록
        ↓
사용자 Event 발생
        ↓
Callback Function 실행
        ↓
DOM 변경
```

HTML 내부에 `onclick`과 같은 Event Handler를 직접 작성하지 않고,
JavaScript에서 Event를 등록함으로써
HTML 구조와 동작 Logic을 분리하였다.


### 4.4 Event → State → DOM Update

본 프로젝트에서 가장 중요한 JavaScript 동작 구조는
사용자 Event가 상태를 변경하고,
변경된 상태에 따라 DOM이 다시 표현되는 흐름이다.

Dark Mode를 예로 들면 다음과 같다.

```text
Theme Button Click
        ↓
현재 Theme 확인
        ↓
Light / Dark 상태 변경
        ↓
data-theme Attribute 변경
        ↓
CSS Variable 변경
        ↓
화면 Theme 변경
```

실제 구현에서는 현재 Theme를 확인한 뒤
다음 Theme를 결정한다.

```javascript
const currentTheme =
    document.documentElement.dataset.theme;

const nextTheme =
    currentTheme === "dark"
        ? "light"
        : "dark";
```

이후 `applyTheme()`을 이용하여 DOM 상태를 변경한다.

```javascript
document.documentElement.dataset.theme = theme;
```

Projects Filtering도 동일한 구조를 가진다.

```text
Filter Button Click
        ↓
선택된 Language 결정
        ↓
Project Array Filtering
        ↓
Filtered Array 생성
        ↓
Project Card DOM 재구성
```

이러한 구조는 Framework를 사용하지 않고도
상태와 화면의 관계를 직접 이해할 수 있도록 한다.

React와 같은 UI Framework에서도
State가 변경되면 UI가 다시 Render되는 구조를 사용하므로,
본 프로젝트의 Event → State → DOM Update 과정은
State 기반 UI Rendering을 이해하기 위한 기초가 된다.


### 4.5 ES6 JavaScript

본 프로젝트에서는 ES6 이상의 JavaScript 문법을 사용하였다.

#### `const`와 `let`

변경되지 않는 값은 `const`,
상태가 변경되는 값은 `let`을 사용하였다.

```javascript
const projects = await response.json();

let isValid = true;
```

#### Arrow Function

Event Handler와 Array Method에서 Arrow Function을 사용하였다.

```javascript
button.addEventListener("click", () => {
    // Event 처리
});
```

#### Destructuring Assignment

Project Object에서 필요한 Property를 추출할 때
구조분해 할당을 사용하였다.

```javascript
const {
    name,
    description,
    html_url,
    language,
    stargazers_count,
    forks_count
} = project;
```

이를 통해 반복적인 `project.name`,
`project.description` 형식의 접근을 줄였다.

#### `map()`

Project Array를 DOM Card Array로 변환할 때 사용하였다.

```javascript
const cards = projects.map((project) => {
    return createProjectCard(project);
});
```

`map()`은 기존 Array의 각 Element를 다른 값으로 변환하여
새로운 Array를 생성한다.

#### `filter()`

특정 Language의 Project만 선택할 때 사용하였다.

```javascript
const filteredProjects = projects.filter((project) => {
    return project.language === language;
});
```

`filter()`는 조건을 만족하는 Element만 선택하여
새로운 Array를 생성한다.

#### `forEach()`

여러 DOM Element에 동일한 처리를 적용할 때 사용하였다.

```javascript
buttons.forEach((button) => {
    button.classList.remove("active");
});
```

Array Method를 사용하면
직접 Index를 관리하는 반복문보다
코드의 목적을 명확하게 표현할 수 있다.


### 4.6 비동기 처리와 Fetch API

GitHub Repository 정보 조회와 Contact Message 전송은
Network를 통해 외부 Server와 통신해야 한다.

Network 요청은 즉시 완료되지 않기 때문에 비동기 처리가 필요하다.

본 프로젝트에서는 `fetch()`와 `async/await`을 사용하였다.

```javascript
const response = await fetch(
    `https://api.github.com/users/${username}/repos`
);

const projects = await response.json();
```

`await`은 Promise가 완료될 때까지
해당 `async` Function 내부의 다음 처리를 대기하도록 한다.

Network 요청에는 다음과 같은 여러 상태가 존재한다.

```text
요청 시작
   ↓
Loading
   ↓
┌─────────────┐
│ 요청 성공   │ → Success
│ Data 없음   │ → Empty
│ 요청 실패   │ → Error
└─────────────┘
```

따라서 본 프로젝트에서는
Data를 가져오는 Logic뿐만 아니라
각 상태를 사용자에게 표현하는 UI도 함께 구현하였다.

```javascript
try {
    const response = await fetch(...);

    if (!response.ok) {
        throw new Error(...);
    }

    const projects = await response.json();

} catch (error) {
    renderError(...);
}
```

이를 통해 비동기 처리는 단순히
Data를 기다리는 문법이 아니라,
시간에 따라 변화하는 Application State를 관리하는 문제라는 점을 확인하였다.


### 4.7 웹과 브라우저의 동작 원리

Browser는 HTML, CSS, JavaScript를 각각 읽고,
최종적으로 이들을 결합하여 하나의 화면을 구성한다.

본 프로젝트에서는 다음과 같이 역할을 구분하였다.

```text
HTML
→ 문서 구조와 의미 정의

CSS
→ Layout과 Style 정의

JavaScript
→ Event 처리와 DOM 상태 변경
```

Browser는 HTML을 읽어 DOM Tree를 구성하고,
CSS를 분석하여 Style을 적용한다.

JavaScript에서는 생성된 DOM을 탐색하고 수정할 수 있다.

```javascript
const header = document.querySelector("#header");
```

Class를 변경하면 Browser는 변경된 상태에 따라
Style을 다시 반영한다.

```javascript
header.classList.toggle("scrolled", isScrolled);
```

또한 `content.json`을 `fetch()`로 읽는 과정에서
HTML 파일을 `file://` 방식으로 직접 열었을 때
Browser의 보안 정책으로 인해 정상적으로 Data를 가져올 수 없는 상황을 확인하였다.

이를 해결하기 위해 Python의 `http.server` Module을 사용하여
Local HTTP Server 환경에서 페이지를 실행하였다.

실행 과정은 `scripts/run.sh`를 이용하여
반복적으로 동일한 방식으로 수행할 수 있도록 구성하였다.

```text
file://
→ Local File 접근

http://localhost
→ Web Server를 통한 HTTP 요청
```

이를 통해 HTML 파일을 Browser에서 직접 여는 것과
HTTP Server를 통해 Web Application을 실행하는 것이
서로 다른 실행 환경이라는 점을 확인하였다.