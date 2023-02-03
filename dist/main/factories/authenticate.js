"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthUserController = void 0;
const jwt_1 = require("../../external/jwt/jwt");
const authUserController_1 = require("../../adapters/http/controllers/users/authUserController");
const bcrypt_1 = require("../../external/bcrypt/bcrypt");
const connectionObject_1 = require("./utils/connectionObject");
const userUseCases_1 = require("../../app/useCases/users/userUseCases");
const postgresUserRepository_1 = require("../../external/database/postgreSQL/user/postgresUserRepository");
const makeAuthUserController = () => {
    const authUserRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject, bcrypt_1.generateHash, jwt_1.generateToken, bcrypt_1.comparePassword);
    const authUser = new userUseCases_1.UserUseCases(authUserRepository);
    const authUserController = new authUserController_1.AuthUserController(authUser);
    return authUserController;
};
exports.makeAuthUserController = makeAuthUserController;
