'use strict';
const expect = require('chai').expect;
const tritemium = require('../lib/tritemius');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?`~!@#$%^&*()_-=+/\'"\\;.:,0123456789 ';

describe('Tritemium', () => {

    describe('key = 2t', () => {
        let data = {
            key: {
                a: 2
            },
            alphabet
        };
        it('encrypt should return Hgprw to Hello', () => {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('Hgprw');
        });
        it('decrypt should return Hello to Hgprw', () => {
            data.message = 'Hgprw';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });

    describe('key = 2t+3', () => {
        let data = {
            key: {
                a: 2,
                b: 3
            },
            alphabet
        };
        it('encrypt should return Kjsuz to Hello', () => {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('Kjsuz');
        });
        it('decrypt should return Hello to Kjsuz', () => {
            data.message = 'Kjsuz';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });

    describe('key = 2t^2+3t+1', () => {
        let data = {
            key: {
                a: 2,
                b: 3,
                c: +1
            },
            alphabet
        };
        it('encrypt should return Ik?_8 to Hello', () => {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('Ik?_8');
        });
        it('decrypt should return Hello to Ik?_8', () => {
            data.message = 'Ik?_8';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });

    describe('key = -2t^2-3t-1', () => {
        let data = {
            key: {
                a: -2,
                b: -3,
                c: -1
            },
            alphabet
        };
        it('encrypt should return GYWJ6 to Hello', () => {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('GYWJ6');
        });
        it('decrypt should return GYWJ6 to Hello', () => {
            data.message = 'GYWJ6';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });

    describe('key = 2t^2+3t+1', () => {
        let data = {
            key: {
                a: 2,
                b: 5,
                c: 3
            },
            alphabet: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ,.'
        };
        it('encrypt should return "ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ" ' +
            'to "СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ."',
            () => {
                data.message = 'СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.';
                const result = tritemium.encrypt(data);
                expect(result)
                .to.equal('ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ');
            });

        it('decrypt should return "СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ." ' +
            'to "ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ"',
            () => {
                data.message = 'ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ';
                const result = tritemium.decrypt(data);
                expect(result)
                .to.equal('СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.');
            });

    });

    describe('message "Hello" with passphrase "simba"', () => {
        let data = {
            key: {
                passphrase: 'simba'
            },
            alphabet
        };
        it('encrypt should return z):)- to Hello', () => {
            data.message = 'Hello';
            let result = tritemium.encrypt(data);
            expect(result).to.equal('z):)-');
        });
        it('decrypt should return Hello to z):)-', () => {
            data.message = 'z):)-';
            let result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });
});