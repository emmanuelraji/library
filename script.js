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
const dialog = document.querySelector("dialog");
const showModal = document.querySelector("header button");
const hideModal = document.querySelector(".hide-modal");

function Book(author, title, numberOfPages, read) {
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
    bookCard.setAttribute("class", "book-card");

    const bookDetailsDiv = document.createElement("div");
    bookDetailsDiv.setAttribute("class", "book-details");

    const readDeleteDiv = document.createElement("div");
    readDeleteDiv.setAttribute("class", "read-delete");

    const bookTitle = document.createElement("p");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `by ${book.author}`;

    const bookPages = document.createElement("p");
    bookPages.innerText = `${book.pages} Pages`;

    const bookRead = document.createElement("p");
    bookRead.innerText = book.read;

    const bookDeleteBtn = document.createElement("button");
    bookDeleteBtn.setAttribute("class", "delete");
    bookDeleteBtn.innerText = "Delete";
    bookDeleteBtn.setAttribute("data-index-number", index.toString());

    const readBtn = document.createElement("button");
    readBtn.innerText = "Read";

    bookDetailsDiv.appendChild(bookTitle);
    bookDetailsDiv.appendChild(bookAuthor);
    bookDetailsDiv.appendChild(bookPages);
    bookDetailsDiv.appendChild(bookRead);

    readDeleteDiv.appendChild(readBtn);
    readDeleteDiv.appendChild(bookDeleteBtn);

    bookCard.appendChild(bookDetailsDiv);
    bookCard.appendChild(readDeleteDiv);

    books.appendChild(bookCard);
  });

  deleteBookFromLibrary();
}

function deleteBookFromLibrary() {
  const buttonsNodeList = document.querySelectorAll(".delete");
  const buttonsList = [...buttonsNodeList];

  buttonsList.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      const indexBookClicked = e.target.dataset.indexNumber;
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });
}

displayBooks();

// Event Listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userBook = {};

  for (let [key, value] of formData.entries()) {
    userBook[key] = value;
  }

  addBookToLibrary(userBook);
  displayBooks();
  dialog.close();
});

showModal.addEventListener("click", () => dialog.showModal());
hideModal.addEventListener("click", () => dialog.close());
