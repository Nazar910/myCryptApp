const express = require('express');
const router = express.Router();

router.use('/tritemius', require('./crypt/tritemius'));

module.exports = router;