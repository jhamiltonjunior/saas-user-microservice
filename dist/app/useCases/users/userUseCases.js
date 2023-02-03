"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCases = void 0;
const either_1 = require("../../../shared/either");
const user_1 = require("../../../domain/entities/users/user");
const userId_1 = require("./validators/userId");
const invalidUserId_1 = require("./errors/invalidUserId");
class UserUseCases {
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
    async authWithEmail(authData) {
        const userOrError = user_1.User.create(authData);
        if (userOrError.isLeft()) {
            return (0, either_1.left)(userOrError.value);
        }
        const result = await this.userRepository.findUserByEmail(authData.email);
        const checkedPassword = await this.userRepository.comparePassword(authData.password, result.password);
        if (result.email && checkedPassword) {
            authData.token = await this.userRepository.authenticateUser(result.user_id);
        }
        else if (authData.token === undefined) {
            authData.email = 'InvalidEmail';
            authData.password = 'InvalidPassword';
        }
        return (0, either_1.right)(authData);
    }
    async showUniqueUser(id) {
        var _a;
        const user = await ((_a = this.userRepository) === null || _a === void 0 ? void 0 : _a.findUserById(id));
        return user;
    }
    async deleteUser(id) {
        const idOrError = userId_1.UserId.create(id);
        if (idOrError.isLeft()) {
            return (0, either_1.left)(new invalidUserId_1.InvalidUserIdError(id));
        }
        const idValue = idOrError.value;
        const user = await this.userRepository.findUserById(idValue.value);
        if (user.user_id !== undefined) {
            this.userRepository.deleteById(user.user_id);
            return (0, either_1.right)('User Deleted');
        }
        return (0, either_1.left)(new Error('User ID not found!'));
    }
}
exports.UserUseCases = UserUseCases;
