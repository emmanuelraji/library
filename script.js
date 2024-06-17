let myLibrary = [
  {
    author: "Mr Test",
    title: "Coding for dummies",
    pages: 300,
    read: false,
  },
  {
    author: "Tester",
    title: "Lucy's home",
    pages: 200,
    read: true,
  },
  {
    author: "Testing Sr",
    title: "Lucy's revenge",
    pages: 400,
    read: true,
  },
];

const books = document.querySelector(".books");
const form = document.querySelector("form");

function Book(author, title, numberOfPages, read) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.numbeOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function reset() {
  while (books.firstChild) books.removeChild(books.lastChild);
}

function displayBooks() {
  reset();

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");
    const bookButton = document.createElement("button");

    bookAuthor.innerText = book.author;
    bookTitle.innerText = book.title;
    bookPages.innerText = book.pages;
    bookRead.innerText = book.read;
    bookButton.innerText = "Delete";
    bookButton.setAttribute("class", "delete");
    bookButton.setAttribute("data-index-number", index.toString());

    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(bookButton);
    books.appendChild(bookCard);

    // bookButton.addEventListener("click", (e) => {
    //   console.log(e.target.dataset.indexNumber);
    //   const indexBookClicked = e.target.dataset.indexNumber;
    //   const newLibrary = myLibrary.filter((_, index) => {
    //     index !== Number(indexBookClicked)
    //   })
    //   myLibrary = newLibrary;
    //   displayBooks();
    // });
  });
  deleteBookFromLibrary();
}

function deleteBookFromLibrary() {
  const buttonsNodeList = document.querySelectorAll(".delete");
  const buttonsList = [...buttonsNodeList];

  buttonsList.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      const indexBookClicked = e.target.dataset.indexNumber;
      console.log(Number(indexBookClicked));
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userBook = {};

  for (let [key, value] of formData.entries()) {
    userBook[key] = value;
  }

  addBookToLibrary(userBook);
  displayBooks();
  console.log(formData);
});

displayBooks();
