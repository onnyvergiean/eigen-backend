const express = require('express');
const router = express.Router();
const bookService = require('../../src/domains/v1/books/bookService');

router.post('/v1/books/:bookId/borrow/:memberId', bookService.borrowBook);
router.post('/v1/books/:bookId/return/:memberId', bookService.returnBook);

module.exports = router;
