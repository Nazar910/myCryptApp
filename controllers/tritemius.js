const co = require('co');
const tritemius = require('../lib/tritemius');

function encrypt(req, res, next) {
    const data = req.body;

    const message = tritemius.encrypt(data);

    res.json({
        message
    });
    next();
}

function decrypt(req, res, next) {
    const data = req.body;

    const message = tritemius.decrypt(data);

    res.json({
        message
    });
    next();
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;