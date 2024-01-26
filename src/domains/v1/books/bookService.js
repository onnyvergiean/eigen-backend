const db = require('../../../../infrastructures/database');
const bookRepository = require('./bookRepository');
const memberRepository = require('../members/memberRepository');
const bookService = {
  borrowBook: async (req, res) => {
    try {
      const { memberId, bookId } = req.params;

      const checkBook = await bookRepository.getBookById(bookId);
      if (!checkBook) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Book not found',
        });
      }

      const checkMember = await memberRepository.getMemberById(memberId);
      if (!checkMember) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Member not found',
        });
      }

      const checkPenaltyStatus = await memberRepository.checkPenaltyStatus(
        memberId
      );
      if (checkPenaltyStatus) {
        return res.status(400).json({
          status: 'fail',
          code: 400,
          message:
            'Member has a penalty cannot borrow a book please wait 3 days',
        });
      }

      const countBorrowedBooks = await bookRepository.countBorrowedBooks(
        memberId
      );

      if (countBorrowedBooks.count >= 2) {
        return res.status(400).json({
          status: 'fail',
          code: 400,
          message:
            'Member has already borrowed the maximum number of books allowed',
        });
      }

      const { stock } = await bookRepository.getBookById(bookId);
      if (stock === 0) {
        return res.status(400).json({
          status: 'fail',
          code: 400,
          message: 'Book is out of stock ',
        });
      }

      await bookRepository.borrowBook(memberId, bookId);
      return res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Book borrowed successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: error.message,
      });
    }
  },
  returnBook: async (req, res) => {
    try {
      const { memberId, bookId } = req.params;

      const checkBook = await bookRepository.getBookById(bookId);
      if (!checkBook) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Book not found',
        });
      }

      const checkMember = await memberRepository.getMemberById(memberId);
      if (!checkMember) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Member not found',
        });
      }

      const checkBorrowedBooks = await bookRepository.checkBorrowedBooks(
        memberId,
        bookId
      );

      if (!checkBorrowedBooks) {
        return res.status(400).json({
          status: 'fail',
          code: 400,
          message: 'Book is not borrowed by the member',
        });
      }

      await bookRepository.returnBook(memberId, bookId);
      return res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Book returned successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: error.message,
      });
    }
  },
};

module.exports = bookService;
