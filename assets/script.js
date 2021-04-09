let library = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };

  info() {
    const readAlready = (this.read) ? 'already read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readAlready}`;
  }
}

function saveLibrary() {
  localStorage.lib = JSON.stringify(library);
}

function removeBook() {
  const { id } = this.parentNode;
  library.splice(id, 1);
  saveLibrary();
  showBooks(); // eslint-disable-line
}

function bookRead() {
  const { id } = this.parentNode;
  const para = this.parentNode.querySelector('p');
  library[id].read = !library[id].read;
  para.innerHTML = library[id].info();
  saveLibrary();
}

function showBooks() {
  container.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    const content = document.createElement('div');
    content.setAttribute('id', i);
    const text = document.createElement('p');
    text.textContent = library[i].info();

    const changeReadBtn = document.createElement('button');
    changeReadBtn.addEventListener('click', bookRead);
    changeReadBtn.textContent = 'Change read status';

    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.textContent = 'Remove this book';

    content.appendChild(text);
    content.appendChild(changeReadBtn);
    content.appendChild(removeBtn);
    container.appendChild(content);
  }
}

function addBookToLibrary() {
  const newBook = new Book(title.value, author.value, pages.value, read.value);

  library.push(newBook);

  saveLibrary();
  showBooks();
}

function showForm() {
  form.classList.toggle('hidden');
  button.classList.toggle('hidden');
}

function loadLibrary() {
  const temprorary = JSON.parse(localStorage.lib);
  const books = [];
  for (let i = 0; i < temprorary.length; i += 1) {
    books.push(new Book(temprorary[i][0], temprorary[i][1], temprorary[i][2], temprorary[i][3]));
  }
  return books;
}

if (localStorage.lib) {
  library = loadLibrary();
  showBooks();
}

button.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', showForm);
