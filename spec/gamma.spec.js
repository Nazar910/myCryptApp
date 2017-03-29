'use strict';
const expect = require('chai').expect;
const gamma = require('../lib/gamma');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?`~!@#$%^&*()_-=+/\'"\\;.:,0123456789 ';

describe('Gamma ', () => {
    describe('key a=120 c=341 m=654', () => {
        let data = {
            key: {
                a: 120,
                c: 341,
                m: 654
            },
            alphabet
        };
        it('encrypt should return Hgprw to Hello', () => {
            data.message = 'Hello';
            const result = gamma.encrypt(data);
            expect(result).to.equal('cNser');
        });
        it('decrypt should return Hello to Hgprw', () => {
            data.message = 'cNser';
            const result = gamma.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });
});
