const express = require('express');
const router = express.Router();
const bookService = require('../../src/domains/v1/books/bookService');

router.post('/v1/books/:bookId/borrow/:memberId', bookService.borrowBook);

module.exports = router;
