function encrypt(data) {
    console.info('encrypting...');
    console.log(data);
    let cryptVar = crypt(data, 1);
    console.log(cryptVar);
    return cryptVar;
}

function decrypt(data) {
    console.info('decrypting...');
    return crypt(data, -1);
}

function crypt(data, sign) {
    const { message, key, alphabet } = data;
    const { passphrase } = key;
    console.log(passphrase);
    if (!message) {
        return 'Please verify your message';
    }
    if (!alphabet) {
        return 'Please provide alphabet in order to encrypt your key'
    }
    let result = '';
    if (!passphrase) {
        message.split('').forEach((elem, index) => {
            let keyIndex = calcKey(key, index);
            console.log(keyIndex);
            let L = (alphabet.indexOf(elem) + sign * keyIndex) % alphabet.length;
            if (L < 0) L += alphabet.length;
            result += alphabet[L];
        });
    } else if (passphrase) {
        message.split('').forEach((elem, index) => {
            let L = alphabet.indexOf(elem) + sign * alphabet.indexOf(passphrase[index % passphrase.length]);
            if (L < 0) {
                L += alphabet.length;
            }
            result += alphabet[L];
        });
    } else {
        return 'Something wrong with your key or passphrase';
    }
    return result;
}

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

function getIndex(shift, N) {
    if (shift < 0) {
        return shift + N;
    }
    return shift;
}


module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;