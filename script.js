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

function renderBooks() {
  reset();

  let html = "";

  myLibrary.forEach((book) => {
    html += `
      <div class="book-card">
        <div class="book-details">
          <p>${book.title}</p>
          <p>by ${book.author}</p>
          <p>${book.pages} Pages</p>
          <p>${book.read}</p>
        </div>
        <div class="read-delete">
          <button>Read</button>
          <button class="delete">Delete</button>
        </div>
      </div>
    `;
  });

  books.innerHTML = html;
  deleteBookFromLibrary();
}

function deleteBookFromLibrary() {
  const buttonsNodeList = document.querySelectorAll(".delete");
  const buttonsList = [...buttonsNodeList];

  buttonsList.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      myLibrary.splice(index, 1);
      renderBooks();
    });
  });
}

renderBooks();

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userBook = {};

  for (let [key, value] of formData.entries()) {
    userBook[key] = value;
  }

  addBookToLibrary(userBook);
  renderBooks();
  dialog.close();
});

showModal.addEventListener("click", () => dialog.showModal());
hideModal.addEventListener("click", () => dialog.close());
