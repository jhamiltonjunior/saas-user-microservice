"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const either_1 = require("../../../shared/either");
const invalidPassword_1 = require("./errors/invalidPassword");
class Password {
    constructor(password) {
        this.password = password;
    }
    static create(password) {
        if (!Password.validate(password)) {
            return (0, either_1.left)(new invalidPassword_1.InvalidPasswordError(password));
        }
        return (0, either_1.right)(new Password(password));
    }
    get value() {
        return this.password;
    }
    static validate(password) {
        if (!password) {
            return false;
        }
        if (password.length < 6 || password.length > 33) {
            return false;
        }
        return true;
    }
}
exports.Password = Password;
