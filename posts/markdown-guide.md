---
title: 마크다운 기능 안내
date: 2026-06-07
description: 이 블로그에서 지원하는 마크다운 요소를 모두 확인할 수 있는 가이드 포스트입니다.
---

이 포스트에서는 블로그에서 지원하는 마크다운 문법을 모두 확인할 수 있습니다.

## 제목 (Headings)

# H1 제목
## H2 제목
### H3 제목
#### H4 제목

---

## 텍스트 서식

일반 텍스트에 **굵게(bold)**, *기울임(italic)*, ~~취소선~~ 을 적용할 수 있습니다.

`인라인 코드`도 작성할 수 있습니다.

---

## 목록

순서 없는 목록:

- 항목 1
- 항목 2
  - 중첩 항목
  - 또 다른 중첩 항목
- 항목 3

순서 있는 목록:

1. 첫 번째
2. 두 번째
3. 세 번째

---

## 인용문 (Blockquote)

> 훌륭한 글쓰기는 단순함에서 시작된다.  
> 복잡한 아이디어를 명확하게 전달하는 것이 진정한 기술이다.

---

## 코드 블록

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
```

---

## 링크와 이미지

[마크다운 공식 가이드](https://www.markdownguide.org)를 참고하세요.

---

## 표 (Table)

| 이름     | 역할          | 언어       |
|----------|---------------|------------|
| HTML     | 구조          | 마크업     |
| CSS      | 스타일        | 스타일시트 |
| JavaScript | 동작        | 프로그래밍 |

---

## 수평선 (Horizontal Rule)

위와 같이 `---` 으로 구분선을 추가할 수 있습니다.

---

다크 모드를 활성화해서 각 요소가 어떻게 보이는지 확인해보세요!
