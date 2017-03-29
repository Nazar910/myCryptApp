'use strict';
const express = require('express');
const router = express.Router();
const gammaController = require('../../controllers/gamma');

router.post('/encrypt', gammaController.encrypt);
router.post('/decrypt', gammaController.decrypt);

module.exports = router;
