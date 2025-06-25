import books from "./books.js";

function find(param0, param1) {
  const date = new Date(param0.slice(0, 4) + "." + param0.slice(4, 6)); // 구매하려는 시점
  const num = param1; // 구매할 권 수
  let availableBooks = books.filter(
    (book) => book.from <= date && date <= book.to && book.number >= num
  );

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
}
console.log(find("198402", 2));
console.log(find("200008", 6));
console.log(find("199004", 3));
