"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const either_1 = require("../../../shared/either");
const name_1 = require("./name");
const email_1 = require("./email");
const password_1 = require("./password");
class User {
    constructor(email, password, name) {
        this.name = name;
        this.email = email;
        this.password = password;
        Object.freeze(this);
    }
    static create(userData) {
        const nameOrError = name_1.Name.create(userData.name || undefined);
        const emailOrError = email_1.Email.create(userData.email);
        const passwordOrError = password_1.Password.create(userData.password);
        if (nameOrError.isLeft()) {
            return (0, either_1.left)(nameOrError.value);
        }
        if (emailOrError.isLeft()) {
            return (0, either_1.left)(emailOrError.value);
        }
        if (passwordOrError.isLeft()) {
            return (0, either_1.left)(passwordOrError.value);
        }
        const name = nameOrError.value;
        const email = emailOrError.value;
        const password = passwordOrError.value;
        return (0, either_1.right)(new User(email, password, name));
    }
}
exports.User = User;
