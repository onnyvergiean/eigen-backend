const express = require('express');
const router = express.Router();

const books = require('./bookRouter');
const members = require('./memberRouter');

router.use(books);
router.use(members);

module.exports = router;
