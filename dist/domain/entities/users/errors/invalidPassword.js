"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordError = void 0;
class InvalidPasswordError extends Error {
    constructor(password) {
        super(`This password ${password} is invalid`);
        this.message = 'InvalidPasswordError';
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
