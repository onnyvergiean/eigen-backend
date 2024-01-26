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
    const borrowedBook = await db.tx(async (t) => {
      const query = `
                WITH updated_book AS (
                    UPDATE Books
                    SET Stock = Stock - 1
                    WHERE Code = $1

                )
                INSERT INTO BorrowedBook (MemberID, BookID)
                SELECT $2, $1
            `;
      const result = await t.one(query, [bookId, memberId]);
      return result;
    });
    return borrowedBook;
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
