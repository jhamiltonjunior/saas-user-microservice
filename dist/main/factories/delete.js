"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteUserController = void 0;
const jwt_1 = require("../../external/jwt/jwt");
const bcrypt_1 = require("../../external/bcrypt/bcrypt");
const connectionObject_1 = require("./utils/connectionObject");
const userUseCases_1 = require("../../app/useCases/users/userUseCases");
const postgresUserRepository_1 = require("../../external/database/postgreSQL/user/postgresUserRepository");
const DeleteUserController_1 = require("../../adapters/http/controllers/users/DeleteUserController");
const makeDeleteUserController = () => {
    const deleteUserRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject, bcrypt_1.generateHash, jwt_1.generateToken, bcrypt_1.comparePassword);
    const deleteUser = new userUseCases_1.UserUseCases(deleteUserRepository);
    const deleteUserController = new DeleteUserController_1.DeleteUserController(deleteUser);
    return deleteUserController;
};
exports.makeDeleteUserController = makeDeleteUserController;
