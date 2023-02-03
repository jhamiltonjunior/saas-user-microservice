"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUserIdError = void 0;
class InvalidUserIdError extends Error {
    constructor(id) {
        super(`This id ${id} is invalid!`);
        this.message = 'InvalidUserIdError';
    }
}
exports.InvalidUserIdError = InvalidUserIdError;
