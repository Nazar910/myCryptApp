'use strict';
const expect = require('chai').expect;
const tritemium = require('../lib/tritemius');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?`~!@#$%^&*()_-=+/\'"\\;.:,0123456789 ';

describe('Tritemium tests', function () {

    describe('key = 2t', function () {
        let data = {
            key: {
                a: 2
            },
            alphabet
        };
        it("encrypt should return Hgprw to Hello", function (done) {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('Hgprw');
            done();
        });
        it("decrypt should return Hello to Hgprw", function (done) {
            data.message = 'Hgprw';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
            done();
        });
    });

    describe('key = 2t+3', function () {
        let data = {
            key: {
                a: 2,
                b: 3
            },
            alphabet
        };
        it("encrypt should return Kjsuz to Hello", function (done) {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('Kjsuz');
            done();
        });
        it("decrypt should return Hello to Kjsuz", function (done) {
            data.message = 'Kjsuz';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
            done();
        });
    });

    describe('key = 2t^2+3t+1', function () {
        let data = {
            key: {
                a: 2,
                b: 3,
                c: 1
            },
            alphabet
        };
        it("encrypt should return Ik?_8 to Hello", function (done) {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('Ik?_8');
            done();
        });
        it("decrypt should return Hello to Ik?_8", function (done) {
            data.message = 'Ik?_8';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
            done();
        });
    });

    describe('key = -2t^2-3t-1', function () {
        let data = {
            key: {
                a: -2,
                b: -3,
                c: -1
            },
            alphabet
        };
        it("encrypt should return GYWJ6 to Hello", function (done) {
            data.message = 'Hello';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('GYWJ6');
            done();
        });
        it("decrypt should return GYWJ6 to Hello", function (done) {
            data.message = 'GYWJ6';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
            done();
        });
    });

    describe('key = 2t^2+3t+1', function () {
        let data = {
            key: {
                a: 2,
                b: 5,
                c: 3
            },
            alphabet: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ,.'
        };
        it("encrypt should return \"ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ\" " +
            "to \"СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.\"", function (done) {
            data.message = 'СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.';
            const result = tritemium.encrypt(data);
            expect(result).to.equal('ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ');
            done();
        });

        it("decrypt should return \"СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.\" " +
            "to \"ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ\"", function (done) {
            data.message = 'ФБЩШЛГД Ч.ЪСЧДП ЕО,ЧЁЬЙЙЛЮЩЛ РЬА РЙХАКЕЛ,РЮШЮЭ,НТЩВ,ПЁФЦВ';
            const result = tritemium.decrypt(data);
            expect(result).to.equal('СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.');
            done();
        });



    });

    describe('message "Hello" with passphrase "simba"', function () {
        let data = {
            passphrase: 'simba',
            alphabet
        };
        it("encrypt should return z):)- to Hello", function (done) {
            data.message = 'Hello';
            let result = tritemium.encrypt(data);
            expect(result).to.equal('z):)-');
            done();
        });
        it("decrypt should return Hello to z):)-", function (done) {
            data.message = 'z):)-';
            let result = tritemium.decrypt(data);
            expect(result).to.equal('Hello');
            done();
        });
    })
});