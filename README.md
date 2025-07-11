# 미션 3

네이버 부스트캠프 [미션 3](https://lucas.codesquad.kr/boostcamp-2025-basic/course/u/%EB%B2%A0%EC%9D%B4%EC%A7%81/%EB%AF%B8%EC%85%983.-%EB%8F%84%EC%84%9C-%EA%B2%80%EC%83%89/%EB%8F%84%EC%84%9C-%EA%B2%80%EC%83%89) 풀이과정입니다.

## 각각의 파일

books.js: 문제에서 주어진 책 데이터를 객체 배열로 저장한 파일입니다.

- `books`: 문제의 책 데이터를 각각 객체로 저장한 배열입니다.
  - `name`: 책의 이름
  - `isOutOfPrint`: 절판 여부
  - `category`: 책의 카테고리
  - `rating`: 책의 별점
  - `number`: 남은 권 수
  - `from`: 책이 판매되기 시작한 날짜
  - `to`: 책의 판매가 끝난 날짜

find.js: 문제에서 요구하는 `find()`를 구현한 파일입니다.

## 풀이

우선 books.js로부터 books 배열을 import 해옵니다.

- books.js에서 `books` 배열을 export 하고 있습니다.

`find(param0, param1)`은 순서대로 날짜 문자열, 구매할 책의 권 수(정수)를 담고 있습니다. 먼저 `param0` 문자열을 가공해서 YYYY.mm 포맷의 문자열로 바꾸고 `Date` 인스턴스로 변환해서 `date`에 저장합니다. `num`은 `param1`의 값을 그대로 씁니다.

그 다음으로 검색 조건에 맞는 책은 필터링합니다. 처음엔 습관적으로 for문을 이용해서 반복문으로 구현하려고 했는데, 생각해보니 JS에서는 배열에 `filter()` 메소드를 제공하더군요. 그래서 이번엔 `filter()` 메소드로 `books` 배열을 필터링 했습니다. 필터링한 결과는 `availableBooks`에 저장합니다.

- 필터링 조건은 다음과 같습니다.
  - `date`가 `book`의 `from`~`to` 사이인가
  - `num`이 `book`의 `number` 이상인가

```js
let availableBooks = books.filter(
  (book) => book.from <= date && date <= book.to && book.number >= num
);
```

`availableBooks`가 비어있으면 "!Empty"를 반환합니다. 그렇지 않을 경우, 문제에서 주어진 조건대로 문자열을 만들기 위해 `availableBooks`를 별점 순으로 정렬하고, `availableBooks`를 `forEach()` 메소드로 순회해서 문자열을 만들었습니다. 그리고 해당 문자열을 반환합니다.

```js
if (availableBooks.length > 0) {
  availableBooks.sort((a, b) => b.rating - a.rating); // 별점 높은 순으로 정렬
  let resultStr = "";
  availableBooks.forEach((book, index, array) => {
    resultStr += `${book.name}${book.isOutOfPrint ? "*" : ""}(${
      book.category
    }) ${book.rating}${index === array.length - 1 ? "" : ", "}`;
  });
  return resultStr; // 조건에 맞는 책이 여러 개일 경우 첫 번째 책 이름 반환
} else {
  return "!EMPTY";
}
```
