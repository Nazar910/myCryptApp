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
                x0: 1
            },
            alphabet
        };
        it('encrypt should return csN@d to Hello', () => {
            data.message = 'Hello';
            const result = gamma.encrypt(data);
            expect(result).to.equal('csN@d');
        });
        it('decrypt should return Hello to csN@d', () => {
            data.message = 'csN@d';
            const result = gamma.decrypt(data);
            expect(result).to.equal('Hello');
        });
    });

    describe('message AAAAAAAAA', () => {
        let data = {
            key: {
                a: 12,
                c: 3,
                x0: 1
            },
            alphabet
        };
        it('encrypt should return PH 2@S~UF to AAAAAAAAA', () => {
            data.message = 'AAAAAAAAA';
            const result = gamma.encrypt(data);
            expect(result).to.equal('PH 2@S~UF');
        });
        it('decrypt should return AAAAAAAAA to PH 2@S~UF', () => {
            data.message = 'PH 2@S~UF';
            const result = gamma.decrypt(data);
            expect(result).to.equal('AAAAAAAAA');
        });
    });

    describe('key a=120 c=341 m=654', () => {
        let data = {
            key: {
                a: 120,
                c: 341,
                x0: 1
            },
            alphabet: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ,.'
        };
        it('encrypt should return "КШЬЛХЪЗПЙСДЫЁТЖЖЬТ,УЗФ АХАЗАЧГЯМВЧ.И В,ЬЫРФЯЮШЁАЁПОЫФШФЕН" ' +
            'to "СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ."',
            () => {
                data.message = 'СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.';
                const result = gamma.encrypt(data);
                expect(result)
                .to.equal('КШЬЛХЪЗПЙСДЫЁТЖЖЬТ,УЗФ АХАЗАЧГЯМВЧ.И В,ЬЫРФЯЮШЁАЁПОЫФШФЕН');
            });

        it('decrypt should return "СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ." ' +
            'to "КШЬЛХЪЗПЙСДЫЁТЖЖЬТ,УЗФ АХАЗАЧГЯМВЧ.И В,ЬЫРФЯЮШЁАЁПОЫФШФЕН"',
            () => {
                data.message = 'КШЬЛХЪЗПЙСДЫЁТЖЖЬТ,УЗФ АХАЗАЧГЯМВЧ.И В,ЬЫРФЯЮШЁАЁПОЫФШФЕН';
                const result = gamma.decrypt(data);
                expect(result)
                .to.equal('СЪЕШЬ ЖЕ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.');
            });
    });

    describe('key = undefined', () => {
        let data = {
            alphabet
        };
        it('should return error="Something wrong with your key"', () => {
            data.message = 'Hello';
            const result = gamma.encrypt(data);
            expect(result).to.deep.equal({
                error: 'Something wrong with your key'
            });
        });
    });

    describe('alphabet=undefined', () => {
        let data = {
            key: {
                a: 120,
                c: 341,
                m: 654
            }
        };
        it('should return error="Please provide alphabet in order to encrypt your key"', () => {
            data.message = 'Hello';
            const result = gamma.encrypt(data);
            expect(result).to.deep.equal({
                error: 'Please provide alphabet in order to encrypt your key'
            });
        });
    });

    describe('message=undefined', () => {
        let data = {
            key: {
                a: 120,
                c: 341,
                m: 654
            },
            alphabet
        };
        it('should return error="Please verify your message"', () => {
            const result = gamma.encrypt(data);
            expect(result).to.deep.equal({
                error: 'Please verify your message'
            });
        });
    });
});
