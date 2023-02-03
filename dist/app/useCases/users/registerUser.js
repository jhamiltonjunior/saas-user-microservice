"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const either_1 = require("../../../shared/either");
const user_1 = require("../../../domain/entities/users/user");
class RegisterUser {
    constructor(registerRepo) {
        this.userRepository = registerRepo;
    }
    async registerUserOnDatabase(userData) {
        const userOrError = user_1.User.create(userData);
        if (userOrError.isLeft()) {
            return (0, either_1.left)(userOrError.value);
        }
        const user = userOrError.value;
        const exists = this.userRepository.exists(userData.email);
        if (!(await exists).valueOf()) {
            if (user.name !== undefined) {
                await this.userRepository.add({
                    name: user.name.value,
                    email: user.email.value,
                    password: user.password.value
                });
            }
        }
        return (0, either_1.right)(userData);
    }
}
exports.RegisterUser = RegisterUser;
