'use strict';

function calcKey(key, index) {
    const { a, b, c } = key;
    if (a) {
        if (b) {
            if (c) {
                return a * Math.pow(index, 2) + b * index + +c;
            }
            return a * index + +b;
        }
        return a * index;
    }
}


function crypt(data, sign) {
    const { message, key, alphabet } = data;

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
            error: 'Something wrong with your key or passphrase'
        };
    }

    const { passphrase } = key;

    let result = '';

    if (passphrase) {
        message.split('').forEach((elem, index) => {
            let L = alphabet.indexOf(elem) + sign * alphabet.indexOf(passphrase[index % passphrase.length]);
            L = L % alphabet.length;

            if (L < 0) {
                L += alphabet.length;
            }

            result += alphabet[L];
        });
    } else {
        message.split('').forEach((elem, index) => {
            let keyIndex = calcKey(key, index);
            let L = (alphabet.indexOf(elem) + sign * keyIndex) % alphabet.length;

            if (L < 0) {
                L += alphabet.length;
            }

            result += alphabet[L];
        });
    }
    return result;
}

function encrypt(data) {
    return crypt(data, 1);
}

function decrypt(data) {
    return crypt(data, -1);
}


module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
