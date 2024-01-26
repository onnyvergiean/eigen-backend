const express = require('express');
const router = express.Router();

const books = require('./bookRouter');

router.use(books);

module.exports = router;
