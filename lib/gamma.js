'use strict';
function rand(key, count) {
    let { a, c, m } = key;
    let result = [];
    let next = 1;
    for (let i = 0; i < count; i++) {
        next = next * a + c;
        result[i] = (next) % m;
    }
    return result;
}

function crypt(data, callback) {
    let { message, key, alphabet } = data;
    if (key.m <= message.length) {
        return '"m" must be > than length of message';
    }
    let gamma = rand(key, message.length);
    let result = '';
    gamma.forEach((kod, index) => {
        let indexOf = alphabet.indexOf(message[index]);
        let i = callback(indexOf, kod, alphabet.length);
        result += alphabet[i];
    });
    return result;
}

function encrypt(data) {
    return crypt(data, (indexOf, kod, length) => (indexOf + kod) % length);
}

function decrypt(data) {
    return crypt(data, (indexOf, kod, length) => (indexOf - kod % length + length) % length);
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
