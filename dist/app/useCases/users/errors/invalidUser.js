"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUserError = void 0;
class InvalidUserError extends Error {
    constructor(user, email) {
        super(`This name or email ${user || email} is invalid!`);
        this.message = 'InvalidUserError';
    }
}
exports.InvalidUserError = InvalidUserError;
