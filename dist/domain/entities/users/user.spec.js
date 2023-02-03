"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("../../../shared/either");
const invalidEmail_1 = require("./errors/invalidEmail");
const invalidName_1 = require("./errors/invalidName");
const invalidPassword_1 = require("./errors/invalidPassword");
const user_1 = require("./user");
describe('User domain entity', () => {
    test('should not create user with invalid name (too few characters)', async () => {
        const name = 'O';
        const user = user_1.User.create({ name, email: 'hamilton@gmail.com', password: '1234' });
        expect(user).toEqual((0, either_1.left)(new invalidName_1.InvalidNameError(name)));
    });
    test('should not create user with invalid name (too many characters)', () => {
        let name = '';
        for (let i = 0; i < 256; i++) {
            name += 'h';
        }
        const user = user_1.User.create({ name, email: 'hamilton@gmail.com', password: '123444' });
        expect(user).toEqual((0, either_1.left)(new invalidName_1.InvalidNameError(name)));
    });
    test('should not create user with invalid name (only blank spaces)', () => {
        let name = '    ';
        const user = user_1.User.create({ name, email: 'hamilton@gmail.com', password: '123444' });
        expect(user).toEqual((0, either_1.left)(new invalidName_1.InvalidNameError(name)));
    });
    test('should not create user with invalid email (empity string)', () => {
        const email = '';
        const user = user_1.User.create({ name: 'Hamilton', email, password: '123456' });
        expect(user).toEqual((0, either_1.left)(new invalidEmail_1.InvalidEmailError(email)));
    });
    test('should not create user with invalid name (only blank spaces)', () => {
        let email = '';
        for (let i = 0; i < 256; i++) {
            email += 'h';
        }
        const user = user_1.User.create({ name: 'hamilton', email, password: '1234567' });
        expect(user).toEqual((0, either_1.left)(new invalidEmail_1.InvalidEmailError(email)));
    });
    test('should not create user with invalid email (outwith @)', () => {
        const email = 'hamiltongmail.com';
        const user = user_1.User.create({ name: 'Hamilton', email, password: '1234567' });
        expect(user).toEqual((0, either_1.left)(new invalidEmail_1.InvalidEmailError(email)));
    });
    test('should not create user with invalid email (outwith dot)', () => {
        const email = 'hamilton@gmailcom';
        const user = user_1.User.create({ name: 'Hamilton', email, password: '1234567' });
        expect(user).toEqual((0, either_1.left)(new invalidEmail_1.InvalidEmailError(email)));
    });
    test('should not create user with invalid password (with less than six characters)', () => {
        const password = '12345';
        const user = user_1.User.create({
            name: 'Hamilton',
            email: 'hamilton@gmail.com',
            password
        });
        expect(user).toEqual((0, either_1.left)(new invalidPassword_1.InvalidPasswordError(password)));
    });
    test('should not create user with invalid password (more than thirty-two characters)', () => {
        let password = '';
        for (let i = 0; i < 34; i++) {
            password += 'h';
        }
        const user = user_1.User.create({
            name: 'Hamilton',
            email: 'hamilton@gmail.com',
            password
        });
        expect(user).toEqual((0, either_1.left)(new invalidPassword_1.InvalidPasswordError(password)));
    });
});
