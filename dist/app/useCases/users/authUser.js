"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const either_1 = require("../../../shared/either");
const user_1 = require("../../../domain/entities/users/user");
class AuthUser {
    constructor(authUserRepo) {
        this.authUserRepository = authUserRepo;
    }
    async authWithEmail(authData) {
        const userOrError = user_1.User.create(authData);
        if (userOrError.isLeft()) {
            return (0, either_1.left)(userOrError.value);
        }
        const result = await this.authUserRepository.findUserByEmail(authData.email);
        const checkedPassword = await this.authUserRepository.comparePassword(authData.password, result.password);
        if (result.email && checkedPassword) {
            authData.token = await this.authUserRepository.authenticateUser(result.user_id);
        }
        else if (authData.token === undefined) {
            authData.email = 'InvalidEmail';
            authData.password = 'InvalidPassword';
        }
        return (0, either_1.right)(authData);
    }
}
exports.AuthUser = AuthUser;
