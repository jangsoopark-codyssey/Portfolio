# Personal Portfolio Website

순수 HTML, CSS, JavaScript로 구현한 반응형 개인 포트폴리오 웹사이트이다.

외부 Framework나 UI Library 없이 웹의 기본 동작을 직접 구현하였다. 핵심
목표는 **Browser가 Web Page를 구성하고 동작시키는 과정**을 이해하는
것이다.

> **Top-Down Approach**\
> Web Browser → HTML / CSS / JavaScript → Web APIs → Event / State →
> Rendering → Portfolio

------------------------------------------------------------------------

## 목차

1.  [Project Overview](#1-project-overview)
2.  [How Does a Web Browser Work?](#2-how-does-a-web-browser-work)
3.  [How Does This Web Page Work?](#3-how-does-this-web-page-work)
4.  [HTML --- Structure](#4-html--structure)
5.  [CSS --- Presentation](#5-css--presentation)
6.  [JavaScript --- Behavior](#6-javascript--behavior)
7.  [Web APIs](#7-web-apis)
8.  [Portfolio Features](#8-portfolio-features)
9.  [Event → State → Render](#9-event--state--render)
10. [Development](#10-development)
11. [Static Web and Deployment](#11-static-web-and-deployment)
12. [Requirements](#12-requirements)
13. [What I Learned](#13-what-i-learned)

------------------------------------------------------------------------

# 1. Project Overview

HTML, CSS, JavaScript만으로 Mobile, Tablet, Desktop 환경에 대응하는
Responsive Portfolio Website를 구현하였다.

주요 Section은 다음과 같다.

-   Hero
-   About
-   Skills
-   Projects
-   Contact
-   Footer

주요 Interaction은 다음과 같다.

-   Responsive Navigation
-   Light / Dark Theme
-   Smooth Scroll
-   Active Navigation Highlight
-   Scroll-to-Top
-   Scroll Reveal Animation
-   GitHub Project Loading / Filtering
-   Contact Form Validation / Submission

## 1.1 Result

최종 결과물은 Mobile, Tablet, Desktop 환경에 대응하는 Responsive
Portfolio Website이다.

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

## 1.2 URL

GitHub Pages:

https://jangsoopark-codyssey.github.io/Portfolio/

Repository:

https://github.com/jangsoopark-codyssey/Portfolio

## 1.3 Project Structure

``` text
Portfolio/
├─ index.html
├─ favicon.ico
├─ assets/
│  ├─ images/
│  │  ├─ profile.png
│  │  └─ profile-dark.png
│  ├─ results/
│  └─ wireframe/
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

|  파일                  | 역할                                           |
|  --------------------- | ------------------------------------------   |
|  `index.html`          | 문서 구조와 Semantic Layout                    |
|  `css/variables.css`   | Color, Font, Spacing 등의 Design Token         |
|  `css/style.css`       | Style, Layout, Responsive Design           |
|  `js/main.js`          | 초기화와 주요 Event 처리                       |
|  `js/content.js`       | `content.json` Load 및 Content Rendering   |
|  `js/github.js`        | GitHub API, Project Rendering, Filtering   |
|  `js/contact.js`       | Contact Validation 및 Formspree 전송           |
|  `data/content.json`   | Portfolio Content와 설정                       |
|  `scripts/run.sh`      | Local HTTP Server 실행                         |

Content는 HTML에 직접 모두 작성하지 않고 `content.json`으로 분리하였다.

## 1.4 Run

`content.json`을 `fetch()`로 읽기 때문에 Local HTTP Server에서 실행한다.

``` bash
cd scripts
./run.sh
```

Local 환경에서는 Python의 `http.server`를 사용한다.

------------------------------------------------------------------------

# 2. How Does a Web Browser Work?

Web Browser는 HTML, CSS, JavaScript와 같은 Resource를 처리하여 사용자가
보고 조작할 수 있는 Web Page를 만든다.

## 2.1 Browser Architecture

실제 Browser는 복잡하지만, 이 프로젝트를 이해하는 데 필요한 구조는
다음과 같이 단순화할 수 있다.

``` text
Web Browser
│
├─ Browser UI
├─ Browser Engine
├─ Rendering Engine
├─ JavaScript Engine
├─ Web APIs
├─ Network
└─ Storage
```

| 구성요소 | 역할 |
| --- | --- |
| Browser UI | 주소창, Tab, 뒤로가기 등 Browser Interface |
| Browser Engine | Browser의 주요 구성요소를 연결하고 제어 |
| Rendering Engine | HTML/CSS를 분석하고 화면을 Rendering |
| JavaScript Engine | JavaScript 코드 실행 |
| Web APIs | DOM, Event, Fetch, Storage 등의 Browser 기능 제공 |
| Network | Resource 및 외부 Data 요청 |
| Storage | Browser Data 저장 |

## 2.2 Rendering Engine

Rendering Engine은 HTML과 CSS를 화면으로 변환한다.

``` text
HTML ──→ DOM ────┐
                 ├─→ Render Tree → Layout → Paint
CSS  ──→ CSSOM ──┘
```

Chrome과 Edge는 Blink, Firefox는 Gecko, Safari는 WebKit 계열의 Rendering
Engine을 사용한다.

## 2.3 JavaScript Engine

JavaScript Engine은 JavaScript 코드를 분석하고 실행한다.

| Browser | JavaScript Engine |
| --- | --- |
| Chrome / Edge | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore |

Browser마다 Engine은 다르지만 공통된 JavaScript 언어 표준을 구현한다.

### ECMAScript

**ECMAScript**는 JavaScript의 표준이다.

``` text
              ECMAScript
          JavaScript Standard
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
       V8    SpiderMonkey   JSC
```

ES6는 ECMAScript 2015를 의미한다. **ES6+**는 ES6 이후의 현대적인
ECMAScript 기능을 통칭하는 표현이다.

본 프로젝트에서는 다음 문법을 사용하였다.

-   `const`, `let`
-   Arrow Function
-   Template Literal
-   Destructuring Assignment
-   `map()`, `filter()`, `forEach()`
-   `async`, `await`

## 2.4 Web APIs

JavaScript Engine이 JavaScript 언어를 실행한다면, Web API는 Browser
기능을 JavaScript에서 사용할 수 있게 한다.

``` text
JavaScript
    │
    └─ Web APIs
       ├─ DOM API
       ├─ Event
       ├─ Fetch API
       ├─ Web Storage API
       └─ Intersection Observer
```

예를 들어 다음 기능은 ECMAScript 자체가 아니라 Browser가 제공하는
기능이다.

``` javascript
document.querySelector("#menu-button");
localStorage.getItem("theme");
fetch("./data/content.json");
```

## 2.5 Browser Storage

Browser는 Page 실행과 별도로 Data를 저장할 수 있다.

본 프로젝트에서는 `localStorage`를 사용한다.

``` text
JavaScript
    ↓
Web Storage API
    ↓
localStorage
```

Theme 값을 저장하여 Page를 새로고침해도 사용자의 선택을 유지한다.

------------------------------------------------------------------------

# 3. How Does This Web Page Work?

Browser 구조를 실제 Portfolio 실행 과정에 적용하면 다음과 같다.

``` text
index.html
    │
    ├─ css/*.css
    ├─ js/*.js
    ├─ data/content.json
    └─ assets/*
          ↓
       Browser
          ↓
 DOM / CSSOM / JavaScript
          ↓
       Rendering
          ↓
        Screen
```

## 3.1 Resource Loading

Browser는 먼저 `index.html`을 읽는다.

HTML에서 참조하는 CSS, JavaScript, Image 등의 Resource도 함께 요청한다.

``` text
index.html
├─ CSS
├─ JavaScript
├─ JSON
└─ Images
```

## 3.2 HTML → DOM

HTML Parser는 HTML 문서를 분석하여 DOM Tree를 만든다.

``` text
HTML
 ↓
HTML Parser
 ↓
DOM
```

예를 들어 Portfolio의 구조는 대략 다음과 같이 표현된다.

``` text
Document
└─ html
   └─ body
      ├─ header
      ├─ main
      │  ├─ section: Hero
      │  ├─ section: About
      │  ├─ section: Skills
      │  ├─ section: Projects
      │  └─ section: Contact
      └─ footer
```

JavaScript는 생성된 DOM을 선택하고 변경할 수 있다.

## 3.3 CSS → CSSOM

Browser는 CSS를 분석하여 CSSOM을 구성한다.

``` text
CSS
 ↓
CSS Parser
 ↓
CSSOM
```

CSSOM에는 Element에 적용할 Style 정보가 포함된다.

## 3.4 Rendering

DOM과 CSSOM을 바탕으로 화면을 구성한다.

``` text
DOM + CSSOM
     ↓
Render Tree
     ↓
Layout
     ↓
Paint
     ↓
Screen
```

-   **Render Tree**: 실제 화면에 표시할 요소 구성
-   **Layout**: 요소의 위치와 크기 계산
-   **Paint**: 계산된 결과를 화면에 그림

## 3.5 JavaScript Execution

JavaScript는 Page의 동작을 담당한다.

본 프로젝트에서는 HTML에서 JavaScript를 `defer`로 연결한다.

JavaScript는 DOM을 선택하고 Event Listener를 등록한다.

``` javascript
const menuButton = document.querySelector("#menu-button");

menuButton.addEventListener("click", () => {
    // Event 처리
});
```

## 3.6 Event → State → DOM Update → Render

사용자 Interaction은 다음 흐름으로 연결된다.

``` text
User
 ↓
Event
 ↓
JavaScript
 ↓
State Change
 ↓
DOM Update
 ↓
Rendering
 ↓
Screen
```

이 흐름이 본 프로젝트의 JavaScript 동작을 이해하는 핵심이다.

------------------------------------------------------------------------

# 4. HTML --- Structure

HTML은 Page의 **구조와 의미**를 정의한다.

## 4.1 Semantic HTML

본 프로젝트에서는 다음 Semantic Tag를 사용하였다.

| Tag | 역할 |
| --- | --- |
| `<header>` | Logo, Navigation, Theme Control |
| `<nav>` | Section Navigation |
| `<main>` | 핵심 Content |
| `<section>` | Hero, About, Skills, Projects, Contact |
| `<article>` | 독립적인 Project Card |
| `<footer>` | Link와 Copyright |

구조는 다음과 같다.

``` text
body
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

Tag는 시각적 모양이 아니라 Content의 의미와 역할을 기준으로 선택하였다.

## 4.2 Accessibility

Image에는 의미에 맞는 `alt`를 사용한다.

Form의 입력 요소는 `label`과 연결한다.

Semantic HTML은 Screen Reader와 같은 보조 기술이 문서 구조를 이해하는
데도 도움이 된다.

------------------------------------------------------------------------

# 5. CSS --- Presentation

CSS는 HTML의 Style과 Layout을 정의한다.

## 5.1 CSS Variables

Color, Font, Spacing 등의 공통 값은 CSS Variable로 관리한다.

Light / Dark Theme도 같은 Variable을 기준으로 변경한다.

## 5.2 Flexbox

Flexbox는 주로 **한 방향의 정렬과 배치**에 사용하였다.

사용 영역:

-   Header
-   Navigation
-   Hero CTA
-   Skill Stack Tag
-   Project Filter
-   Contact Form

``` css
.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

## 5.3 Grid

Grid는 **행과 열을 사용하는 Card Layout**에 사용하였다.

주요 사용 영역은 Skills와 Projects이다.

``` css
#skills-list {
    display: grid;
    grid-template-columns: 1fr;
}
```

화면이 넓어지면 Column 수를 증가시킨다.

``` text
Mobile  → 1 Column
Tablet  → 2 Columns
Desktop → 4 Columns (Skills)
```

## 5.4 Responsive Design

하나의 HTML 구조를 유지하고 CSS Media Query로 Layout을 변경한다.

``` text
하나의 HTML
    +
하나의 JavaScript
    +
화면 크기에 따른 CSS
```

## 5.5 Mobile First

기본 Style은 Mobile을 기준으로 작성하였다.

이후 `min-width` Media Query로 Tablet과 Desktop Layout을 확장한다.

``` css
@media (min-width: 768px) {
    /* Tablet */
}

@media (min-width: 1024px) {
    /* Desktop */
}
```

| 환경 | 주요 Layout |
| --- | --- |
| Mobile | Single Column, Hamburger Navigation |
| Tablet | 2 Column 중심, Horizontal Navigation |
| Desktop | 넓은 Grid, Content Max Width |

------------------------------------------------------------------------

# 6. JavaScript --- Behavior

JavaScript는 사용자 Interaction과 동적인 화면 변경을 담당한다.

``` text
HTML       → Structure
CSS        → Presentation
JavaScript → Behavior
```

## 6.1 ES6+ JavaScript

### `const` / `let`

변경하지 않는 Binding은 `const`, 변경이 필요한 상태는 `let`을
사용하였다.

``` javascript
const projects = await response.json();
let isValid = true;
```

### Arrow Function

``` javascript
button.addEventListener("click", () => {
    // Event 처리
});
```

### Destructuring

``` javascript
const {
    name,
    description,
    html_url,
    language
} = project;
```

### Array Methods

``` javascript
const cards = projects.map(createProjectCard);

const filteredProjects = projects.filter((project) => {
    return project.language === language;
});

buttons.forEach((button) => {
    button.classList.remove("active");
});
```

## 6.2 DOM Selection

DOM을 변경하려면 먼저 대상 Element를 선택한다.

``` javascript
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
```

## 6.3 DOM Manipulation

선택한 Element의 Content, Attribute, Class 등을 변경한다.

본 프로젝트에서는 다음 API를 사용한다.

-   `textContent`
-   `replaceChildren`
-   `classList.add()`
-   `classList.remove()`
-   `classList.toggle()`
-   `dataset`

## 6.4 Event Handling

HTML의 `onclick` 대신 `addEventListener()`를 사용한다.

``` javascript
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});
```

주요 Event:

-   `click`
-   `scroll`
-   `input`
-   `submit`

## 6.5 State

State는 현재 UI가 어떤 상태인지를 나타낸다.

예:

-   Menu가 열려 있는가?
-   현재 Theme은 무엇인가?
-   어떤 Project Filter가 선택되었는가?
-   API 요청은 Loading인가 Error인가?

State가 변경되면 DOM도 그 상태에 맞게 변경한다.

------------------------------------------------------------------------

# 7. Web APIs

JavaScript는 Browser가 제공하는 Web API를 이용하여 Page와 상호작용한다.

## 7.1 DOM API

`document`, `querySelector()`, `classList` 등을 이용하여 DOM을 탐색하고
변경한다.

``` text
JavaScript
    ↓
DOM API
    ↓
DOM
    ↓
Rendering
```

## 7.2 Web Storage API

Theme 선택은 `localStorage`에 저장한다.

``` text
Theme Button Click
       ↓
Theme State 변경
       ↓
localStorage 저장
       ↓
DOM의 data-theme 변경
       ↓
Rendering
```

새로고침 시에는 저장된 값을 다시 읽는다.

``` text
Page Load
   ↓
localStorage.getItem()
   ↓
Theme State 복원
   ↓
DOM Update
   ↓
Render
```

Theme 결정 우선순위:

1.  사용자가 `localStorage`에 저장한 Theme
2.  `prefers-color-scheme`
3.  기본 Light Theme

## 7.3 Intersection Observer

Section이 Viewport에 진입했는지 감지하는 데 사용한다.

이를 이용하여 Scroll Reveal Animation을 처리한다.

## 7.4 Fetch API

외부 또는 별도 Resource를 가져올 때 `fetch()`를 사용한다.

사용 위치:

-   `content.json`
-   GitHub REST API
-   Formspree

``` javascript
const response = await fetch(url);
const data = await response.json();
```

## 7.5 Async / Await

Network 요청은 즉시 완료되지 않으므로 비동기 처리가 필요하다.

``` text
Request
   ↓
Loading
   ↓
┌───────────────┐
│ Success       │
│ Empty         │
│ Error         │
└───────────────┘
```

`try/catch`로 실패 상태를 처리한다.

``` javascript
try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const data = await response.json();
} catch (error) {
    renderError();
}
```

------------------------------------------------------------------------

# 8. Portfolio Features

앞에서 살펴본 Browser, HTML, CSS, JavaScript, Web API가 실제 기능에서
함께 동작한다.

## 8.1 Navigation

Navigation Link를 선택하면 해당 Section으로 이동한다.

현재 Viewport에 위치한 Section에 따라 Active Navigation도 변경한다.

## 8.2 Hamburger Menu

Mobile에서는 Menu Button으로 Navigation을 열고 닫는다.

``` text
Click
 ↓
Event Listener
 ↓
Class 변경
 ↓
CSS 적용
 ↓
Menu 표시 / 숨김
```

Navigation 외부를 클릭하면 열린 Menu를 닫는다.

## 8.3 Smooth Scroll

Navigation과 CTA를 클릭하면 대상 Section으로 부드럽게 이동한다.

## 8.4 Active Navigation Highlight

Scroll 위치에 따라 현재 Section을 판단하고 해당 Navigation Item에 Active
Style을 적용한다.

## 8.5 Scroll-to-Top

일정 위치 이상 Scroll하면 Top Button을 표시한다.

Button을 클릭하면 Page 상단으로 이동한다.

## 8.6 Theme

`data-theme` Attribute와 CSS Variable을 이용하여 Light / Dark Theme을
전환한다.

사용자가 선택한 Theme은 `localStorage`에 저장한다.

## 8.7 Scroll Animation

`IntersectionObserver`로 Section의 Viewport 진입을 감지한다.

`prefers-reduced-motion` 환경에서는 불필요한 Animation을 줄인다.

## 8.8 Projects

GitHub REST API에서 Repository 정보를 가져와 Project Card를 생성한다.

``` text
GitHub API
    ↓
fetch()
    ↓
Project Array
    ↓
map()
    ↓
Project Card
    ↓
DOM
```

API 상태는 다음과 같이 구분한다.

-   Loading
-   Success
-   Empty
-   Error
-   Retry

Language Filter는 새로운 API 요청 없이 기존 Array에 `filter()`를
적용한다.

``` javascript
const filteredProjects = projects.filter((project) => {
    return project.language === language;
});
```

## 8.9 Contact

Name, Email, Message를 JavaScript에서 검증한다.

Validation을 통과하면 Formspree로 Message를 전송한다.

전송 상태:

-   Sending
-   Success
-   Error

------------------------------------------------------------------------

# 9. Event → State → Render

본 프로젝트의 기능은 공통적으로 다음 흐름을 가진다.

``` text
User
 ↓
Event
 ↓
JavaScript
 ↓
State
 ↓
DOM Update
 ↓
Rendering
 ↓
Screen
```

## 9.1 Hamburger Menu

``` text
Menu Click
 ↓
Menu State 변경
 ↓
Navigation Class 변경
 ↓
CSS
 ↓
Render
```

## 9.2 Theme

``` text
Theme Click
 ↓
Theme State 변경
 ├─→ localStorage
 ↓
data-theme 변경
 ↓
CSS Variables 변경
 ↓
Render
```

## 9.3 Project Filtering

``` text
Filter Click
 ↓
Language State 결정
 ↓
projects.filter()
 ↓
Filtered Projects
 ↓
DOM 재구성
 ↓
Render
```

## 9.4 GitHub API

``` text
Request
 ↓
Loading State
 ↓
fetch()
 ↓
Success / Empty / Error
 ↓
DOM Update
 ↓
Render
```

## 9.5 Contact Form

``` text
Submit
 ↓
Validation
 ↓
Valid / Invalid
 ↓
DOM Update
 ↓
Valid → Network Request
 ↓
Sending / Success / Error
 ↓
Render
```

------------------------------------------------------------------------

# 10. Development

개발은 Wireframe 설계 후 Mobile First 방식으로 진행하였다.

### 10.1 Wireframe

구현 전 Mobile, Tablet, Desktop의 정보 구조와 Layout을 설계하였다.

#### Mobile

![Mobile](./assets/wireframe/Mobile.png)

#### Tablet

![Tablet](./assets/wireframe/Tablet.png)

#### Desktop

![Desktop](./assets/wireframe/Desktop.png)

## 10.2 Mobile

Mobile에서 HTML 구조와 JavaScript 기능을 먼저 완성하였다.

주요 기능:

-   Hamburger Navigation
-   Smooth Scroll
-   Scroll-to-Top
-   Header Scroll State
-   Light / Dark Theme
-   GitHub Projects
-   Project Filtering
-   Contact Form
-   Scroll Animation
-   Typing Effect

## 10.3 Tablet

`768px` 이상에서 Tablet Layout을 적용한다.

주요 변화:

-   Hamburger Navigation → Horizontal Navigation
-   Skills 1열 → 2열
-   Projects 1열 → 2열
-   Typography와 Spacing 확대

## 10.4 Desktop

`1024px` 이상에서 Desktop Layout을 적용한다.

주요 변화:

-   Content Max Width 적용
-   Skills 4열
-   Projects 3열
-   Typography와 Section Spacing 확대

기능은 동일하게 유지하고 CSS Layout을 중심으로 확장하였다.

------------------------------------------------------------------------

# 11. Static Web and Deployment

## 11.1 Static Website

본 프로젝트에는 별도의 Application Server가 없다.

HTML, CSS, JavaScript, JSON, Image와 같은 정적 Resource를 Browser가 받아
실행한다.

다만 **Application Server가 없다는 것과 HTTP Server가 필요 없다는 것은
다르다.**

## 11.2 `file://`

`index.html`을 직접 열면 Local File 환경에서 실행된다.

``` text
file://
→ Local File
```

본 프로젝트는 `content.json`을 `fetch()`로 읽기 때문에 Browser 보안
정책의 영향을 받을 수 있다.

## 11.3 Local HTTP Server

개발 환경에서는 Python `http.server`를 사용한다.

``` text
Browser
   ↓ HTTP Request
Local HTTP Server
   ↓
HTML / CSS / JS / JSON
```

이를 `scripts/run.sh`로 실행한다.

## 11.4 GitHub Pages

배포 환경에서는 GitHub Pages가 정적 Resource를 HTTP로 제공한다.

Browser는 이를 내려받아 동일한 방식으로 Page를 구성하고 실행한다.

------------------------------------------------------------------------

# 12. Requirements

## 12.1 Required

  -----------------------------------------------------------------------
  요구사항                            구현
  ----------------------------------- -----------------------------------
  Responsive Website                  Mobile First, Tablet / Desktop
                                      Media Query

  Hero / About / Skills / Projects /  구현
  Contact / Footer                    

  Semantic HTML                       `header`, `nav`, `main`, `section`,
                                      `article`, `footer`

  Mobile Navigation                   Hamburger Menu

  Smooth Scroll                       구현

  Header Scroll State                 구현

  Scroll-to-Top                       구현

  Dark Mode                           `data-theme` + CSS Variables

  Theme Persistence                   `localStorage`

  Scroll Animation                    `IntersectionObserver`

  DOM Manipulation                    `querySelector`, `classList`,
                                      `textContent`, `replaceChildren`

  Event Handling                      `addEventListener`

  ES6+                                Arrow Function, Destructuring,
                                      Array Methods 등

  GitHub API                          `fetch()` + `async/await`

  API State UI                        Loading / Success / Empty / Error /
                                      Retry

  Form Validation                     Name / Email / Message 검증

  GitHub Pages                        배포
  -----------------------------------------------------------------------

## 12.2 Bonus

  요구사항            구현
  ------------------- ---------------------------------
  Project Filtering   `filter()` 기반 Language Filter
  Typing Effect       Hero Typing Animation
  Form Submission     Formspree
  System Dark Mode    `prefers-color-scheme`

------------------------------------------------------------------------

# 13. What I Learned

이 프로젝트는 HTML, CSS, JavaScript 문법을 각각 사용하는 데서 끝나지
않는다.

Browser 안에서 각 기술이 어떻게 연결되는지를 직접 확인하는 것이
핵심이다.

``` text
Web Browser
    ↓
Resource Loading
    ↓
HTML / CSS / JavaScript
    ↓
DOM / CSSOM
    ↓
JavaScript + Web APIs
    ↓
Event
    ↓
State
    ↓
DOM Update
    ↓
Rendering
    ↓
Screen
```

이를 통해 다음 흐름을 직접 구현하였다.

> **User Event → State Change → DOM Update → Rendering**

Framework 없이 구현함으로써 향후 React와 같은 UI Framework가 추상화하는
기본 동작을 이해할 수 있었다.
