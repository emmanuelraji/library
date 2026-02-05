const root = document.querySelector("#root");
const form = document.querySelector("form");

let library = [];

const Book = (title, author, pages, read) => {
  return {
    id: self.crypto.randomUUID(),
    title,
    author,
    pages,
    read,
    info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "read" : "not read yet"
      }`;
    },
  };
};

function addBookToLibrary({ title, author, pages, read }) {
  const newBook = Book(title, author, pages, read);
  library.push(newBook);
}

function removeBookFromLibrary(index) {
  library.splice(index, 1);
}

root.addEventListener("click", (event) => {
  const id = event.target.dataset.id;

  if (!id) return;

  const index = library.findIndex((book) => book.id === id);
  removeBookFromLibrary(index);
  render();
});

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  addBookToLibrary({
    title: formData.get("title"),
    author: formData.get("author"),
    pages: Number(formData.get("pages")),
    read: formData.get("read") === "yes" ? true : false,
  });

  render();
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const heading = document.createElement("h2");
  heading.textContent = book.title;

  const info = document.createElement("div");
  info.className = "book-info";

  const author = document.createElement("span");
  author.textContent = book.author;

  const pages = document.createElement("span");
  pages.textContent = book.pages;

  const button = document.createElement("button");
  button.textContent = "remove";
  button.dataset.id = book.id;

  info.append(author, pages);
  card.append(heading, info, button);

  return card;
}

function render() {
  root.innerHTML = "";

  library.forEach((book) => {
    root.appendChild(createBookCard(book));
  });
}

/* -- RENDER INITAL BOOK(S) -- */

addBookToLibrary({
  title: "Gone Girl",
  author: "Gillian Flynn",
  pages: 432,
  read: false,
});

addBookToLibrary({
  title: "1984",
  author: "George Orwell",
  pages: 328,
  read: false,
});

addBookToLibrary({
  title: "The Name of the Wind",
  author: "Patrick Rothfuss",
  pages: 662,
  read: false,
});

render();

/*

The rule I’d give you:
1.) Learning / small app → re-render all
2.) Interactive UI / frequent updates → update one
3.) Confused which to choose? → re-render all until it hurts

function updateTaskUI(id, completed) {
  const li = listContainer.querySelector(`[data-id="${id}"]`);
  if (!li) return;

  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.checked = completed;
}
  
*/

/*
<div class="book-card">
  <h2>${book.title}</h2>
  <div class="book-info">
    <span>Author: ${book.author}</span>
    <span>Pages: ${book.pages}</span>
  </div>
  <button data-id=${book.id}>remove</button>
</div>
*/
