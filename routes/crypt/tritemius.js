const express = require('express');
const router = express.Router();
const tritemiumController = require('../../controllers/tritemius');

router.post('/encrypt', tritemiumController.encrypt);
router.post('/decrypt', tritemiumController.decrypt);

module.exports = router;