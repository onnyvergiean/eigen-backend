const db = require('../../../../infrastructures/database');

const bookRepository = {
  getAllBooks: async () => {
    const query = 'SELECT * FROM books';
    const books = await db.any(query);
    return books;
  },
  getBookById: async (id) => {
    const query = 'SELECT * FROM books WHERE code = $1';
    const book = await db.oneOrNone(query, id);
    return book;
  },
  borrowBook: async (memberId, bookId) => {
    const query = `INSERT INTO BorrowedBook (MemberID, BookID) VALUES ($1, $2) RETURNING *`;
    const book = await db.one(query, [memberId, bookId]);
    return book;
  },
  countBorrowedBooks: async (id) => {
    const query = `
    SELECT COUNT(*) FROM borrowedbook WHERE memberid = $1;
  `;
    const Books = await db.oneOrNone(query, id);
    return Books;
  },
};

module.exports = bookRepository;
