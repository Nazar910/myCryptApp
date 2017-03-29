'use strict';
const express = require('express');
const router = express.Router();

router.use('/tritemius', require('./crypt/tritemius'));
router.use('/gamma', require('./crypt/gamma'));

module.exports = router;
