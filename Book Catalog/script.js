const rollNumber = '27100404';
const baseURL = `https://assignment3.rohanhussain.com/api/books/${rollNumber}`;

function loadBooks() {
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('book-list');
      list.innerHTML = '';
      data.forEach(book => list.appendChild(createCard(book)));
    })
}

// document.addEventListener('DOMContentLoaded', () => {
//   if (document.getElementById('book-form')) {
//     loadBooks();
//     document.getElementById('book-form').addEventListener('submit', handleSubmit);
//   }

//   if (document.getElementById('search-form')) {
//     document.getElementById('search-form').addEventListener('submit', handleSearch);
//   }
// });

function handleSubmit(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const cover = document.getElementById('cover').value;
  const price = document.getElementById('price').value;

  const book = { title, author, cover, price };

  fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
    .then(res => res.json())
    .then(() => {
      e.target.reset();
      loadBooks();
    })
    .catch(err => console.error('Error adding book:', err));
}

function handleSearch(e) {
  const query = document.getElementById('search-query').value;

  fetch(`${baseURL}/search`)
    .then(res => res.json())
    .then(data => {
      const results = document.getElementById('search-results');
      results.innerHTML = '';
      data.forEach(book => results.appendChild(createCard(book)));
    })
    .catch(err => console.error('Search error:', err));
}

function createCard(book) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${book.cover}" alt="${book.title}">
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Price:</strong> $${book.price}</p>
  `;
  return div;
}

const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');
const books = [];

function renderBooks() {
  bookList.innerHTML = '';
  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${book.cover}" alt="Cover" width="100" />
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Price: $${book.price}</p>
    `;
    bookList.appendChild(card);
  });
}

bookForm.addEventListener('submit', function(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const cover = document.getElementById('cover').value;
  const price = document.getElementById('price').value;
  books.push({ title, author, cover, price });
  renderBooks();
  bookForm.reset();
});

renderBooks();
