---
title: 웹의 세 가지 기둥 — HTML, CSS, JavaScript
date: 2026-06-07
description: 웹 페이지를 구성하는 HTML, CSS, JavaScript가 각각 어떤 역할을 하는지 간단하게 설명합니다.
---

웹 페이지는 세 가지 핵심 기술로 만들어집니다. 건물에 비유하면 이렇습니다.

- **HTML** — 건물의 뼈대 (구조)
- **CSS** — 인테리어와 외장 (디자인)
- **JavaScript** — 전기, 엘리베이터, 자동문 (동작)

---

## HTML — 구조를 담당한다

**HTML**(HyperText Markup Language)은 웹 페이지의 내용과 구조를 정의합니다. 제목이 어디 있고, 문단이 어디 있고, 이미지가 어디 있는지를 브라우저에게 알려주는 역할입니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>나의 첫 페이지</title>
  </head>
  <body>
    <h1>안녕하세요!</h1>
    <p>이것은 문단입니다.</p>
    <a href="https://example.com">링크</a>
  </body>
</html>
```

HTML은 **태그(tag)** 로 이루어져 있습니다. `<h1>`은 가장 큰 제목, `<p>`는 문단, `<a>`는 링크를 나타냅니다. 태그는 보통 여는 태그(`<태그>`)와 닫는 태그(`</태그>`) 쌍으로 씁니다.

> HTML은 프로그래밍 언어가 아닙니다. 내용을 *마크업(markup)* 하는 언어, 즉 "이건 제목이야", "이건 목록이야"라고 표시하는 언어입니다.

---

## CSS — 디자인을 담당한다

**CSS**(Cascading Style Sheets)는 HTML 요소를 어떻게 보여줄지를 결정합니다. 색상, 글꼴, 크기, 간격, 레이아웃 등 시각적인 모든 것이 CSS의 영역입니다.

```css
/* 제목 스타일 */
h1 {
  color: #2563eb;
  font-size: 2rem;
  font-weight: 700;
}

/* 문단 스타일 */
p {
  line-height: 1.75;
  color: #374151;
}

/* 다크모드 지원 */
@media (prefers-color-scheme: dark) {
  body {
    background: #0f172a;
    color: #e2e8f0;
  }
}
```

CSS는 **선택자(selector)** 로 HTML 요소를 고른 뒤, **속성(property)** 으로 스타일을 적용합니다. `h1 { color: blue; }` 는 "모든 h1 요소의 글자색을 파란색으로 해라"는 뜻입니다.

### CSS의 핵심 개념

| 개념 | 설명 |
|------|------|
| 박스 모델 | 모든 요소는 margin, border, padding, content로 이루어진 박스 |
| Flexbox | 요소를 가로/세로로 유연하게 배치하는 레이아웃 방식 |
| Grid | 2차원 격자 형태의 레이아웃 방식 |
| 미디어 쿼리 | 화면 크기에 따라 다른 스타일을 적용 (반응형 디자인) |

---

## JavaScript — 동작을 담당한다

**JavaScript**는 웹 페이지를 살아있게 만드는 프로그래밍 언어입니다. 버튼 클릭, 데이터 불러오기, 애니메이션, 폼 검증 등 모든 인터랙티브한 동작을 처리합니다.

```javascript
// 버튼 클릭 시 메시지 표시
const button = document.querySelector('#btn');

button.addEventListener('click', () => {
  alert('안녕하세요!');
});

// 서버에서 데이터 가져오기
async function fetchData() {
  const response = await fetch('https://api.example.com/posts');
  const data = await response.json();
  console.log(data);
}
```

JavaScript는 브라우저 안에서 바로 실행되며, HTML 요소를 동적으로 읽고 수정할 수 있습니다(이를 **DOM 조작**이라고 합니다).

---

## 세 가지가 함께 동작하는 방식

실제 웹 페이지에서 세 기술은 이렇게 협력합니다.

1. **HTML**이 "버튼이 있다"고 구조를 정의한다
2. **CSS**가 버튼을 둥글고 파랗게 꾸민다
3. **JavaScript**가 버튼을 클릭하면 어떤 일이 일어날지 처리한다

```html
<!-- HTML: 구조 -->
<button id="btn" class="primary-btn">클릭하세요</button>
```

```css
/* CSS: 디자인 */
.primary-btn {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
```

```javascript
// JavaScript: 동작
document.getElementById('btn').addEventListener('click', () => {
  document.body.style.background = '#dbeafe';
});
```

---

## 어디서 시작하면 좋을까?

세 기술 모두 브라우저 하나만 있으면 바로 시작할 수 있습니다. 학습 순서는 **HTML → CSS → JavaScript** 순서가 자연스럽습니다. 구조를 먼저 이해한 뒤 꾸미고, 그다음 움직이게 만드는 방식으로 접근하면 됩니다.

> 완벽하게 이해하고 시작하려 하지 마세요. 만들고 싶은 것을 먼저 정하고, 필요한 것을 찾아가며 배우는 것이 가장 빠릅니다.
