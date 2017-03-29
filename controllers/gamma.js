'use strict';
const gamma = require('../lib/gamma');

function encrypt(req, res, next) {
    const data = req.body;

    const message = gamma.encrypt(data);

    res.json({
        message
    });
    next();
}

function decrypt(req, res, next) {
    const data = req.body;

    const message = gamma.decrypt(data);

    res.json({
        message
    });
    next();
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
