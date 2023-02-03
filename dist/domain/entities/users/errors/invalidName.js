"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidNameError = void 0;
class InvalidNameError extends Error {
    constructor(name) {
        super(`The name ${name} is invalid`);
        this.message = 'InvalidNameError';
    }
}
exports.InvalidNameError = InvalidNameError;
