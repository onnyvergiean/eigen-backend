const db = require('../../../../infrastructures/database');
const memberRepository = require('../members/memberRepository');
const bookRepository = {
  getAllBooksReady: async () => {
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
    const member = await memberRepository.getMemberById(memberId);
    const diffInMs = new Date() - member.penaltydate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (member.penaltystatus && diffInDays > 3) {
      await memberRepository.updatePenalty(memberId, null);
    }
    const borrowedBook = await db.tx(async (t) => {
      const query = `
                WITH updated_book AS (
                    UPDATE Books
                    SET Stock = Stock - 1
                    WHERE Code = $1
                    returning *
                    
                )
                INSERT INTO BorrowedBook (MemberID, BookID)
                SELECT $2, $1 FROM updated_book returning *;
            `;
      const result = await t.one(query, [bookId, memberId]);

      return result;
    });
    return borrowedBook;
  },
  countBorrowedBooks: async (id) => {
    const query = `
    SELECT COUNT(*) FROM borrowedbook WHERE memberid = $1 AND status = 'Borrowed';
  `;
    const books = await db.oneOrNone(query, id);
    return books;
  },
  checkBorrowedBooks: async (memberId, bookId) => {
    const query = `
    SELECT * FROM borrowedbook WHERE memberid = $1 AND bookid = $2 AND status = 'Borrowed';
  `;
    const books = await db.oneOrNone(query, [memberId, bookId]);
    return books;
  },
  returnBook: async (memberId, bookId) => {
    const returnedBook = await db.tx(async (t) => {
      const updateQuery = `
            WITH updated_book AS (
                UPDATE Books
                SET Stock = Stock + 1
                WHERE Code = $1
                RETURNING *
            ),
            updated_borrowed_book AS (
                UPDATE BorrowedBook
                SET 
                    ReturnDate = CURRENT_TIMESTAMP,
                    Status = CASE 
                                WHEN CURRENT_TIMESTAMP <= BorrowDate + INTERVAL '7 days' THEN 'Returned On Time'
                                ELSE 'Returned Late'
                            END
                WHERE MemberID = $2 AND BookID = $1 AND Status = 'Borrowed'
                RETURNING *
            )
            SELECT * FROM updated_borrowed_book;
        `;
      const result = await t.oneOrNone(updateQuery, [bookId, memberId]);

      if (result) {
        const { returndate, borrowdate } = result;
        const diffInMs = returndate - borrowdate;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (diffInDays > 7) {
          const penaltyEndDate = new Date();
          penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
          await memberRepository.updatePenalty(memberId, penaltyEndDate);
        }
      }
      return result;
    });
    return returnedBook;
  },
};

module.exports = bookRepository;
