"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailError = void 0;
class InvalidEmailError extends Error {
    constructor(email) {
        super(`The email ${email} is invalid`);
        this.message = 'InvalidEmailError';
    }
}
exports.InvalidEmailError = InvalidEmailError;
