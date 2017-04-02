'use strict';
function rand(key, count) {
    const { a, c, x0 } = key;
    const m = Math.pow(2, 15) - 1;
    let result = [];
    let next = x0;

    for (let i = 0; i < count; i++) {
        next = next * a + +c;
        result[i] = (next) % m;
    }

    return result;
}

function crypt(data, callback) {
    let { message, key, alphabet } = data;

    if (!message) {
        return {
            error: 'Please verify your message'
        };
    }

    if (!alphabet) {
        return {
            error: 'Please provide alphabet in order to encrypt your key'
        };
    }

    if (!key) {
        return {
            error: 'Something wrong with your key'
        };
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
