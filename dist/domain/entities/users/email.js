"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const either_1 = require("../../../shared/either");
const invalidEmail_1 = require("./errors/invalidEmail");
class Email {
    constructor(email) {
        this.email = email;
        Object.freeze(this);
    }
    static create(email) {
        email = email.trim().replace(/( )+/g, '');
        if (!Email.validate(email)) {
            return (0, either_1.left)(new invalidEmail_1.InvalidEmailError(email));
        }
        return (0, either_1.right)(new Email(email));
    }
    get value() {
        return this.email;
    }
    static validate(email) {
        const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!email) {
            return false;
        }
        if (email.length > 256) {
            return false;
        }
        if (!tester.test(email)) {
            return false;
        }
        const [account, address] = email.split('@');
        if (account.length > 64) {
            return false;
        }
        const domainParts = address.split('.');
        if (domainParts.some(function (part) {
            return part.length > 63;
        })) {
            return false;
        }
        return true;
    }
}
exports.Email = Email;
