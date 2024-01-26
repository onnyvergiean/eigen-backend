const express = require('express');
const router = express.Router();
const memberService = require('../../src/domains/v1/members/memberService');

router.get('/v1/members', memberService.getAllMembers);

module.exports = router;
