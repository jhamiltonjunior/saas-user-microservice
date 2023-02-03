"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterUserController = void 0;
const bcrypt_1 = require("../../external/bcrypt/bcrypt");
const connectionObject_1 = require("./utils/connectionObject");
const postgresUserRepository_1 = require("@src/external/database/postgreSQL/user/postgresUserRepository");
const jwt_1 = require("@src/external/jwt/jwt");
const registerUserController_1 = require("@src/adapters/http/controllers/users/registerUserController");
const userUseCases_1 = require("@src/app/useCases/users/userUseCases");
const makeRegisterUserController = () => {
    const postgresUserRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject, bcrypt_1.generateHash, jwt_1.generateToken, bcrypt_1.comparePassword);
    const registerUser = new userUseCases_1.UserUseCases(postgresUserRepository);
    const registerUserController = new registerUserController_1.RegisterUserController(registerUser);
    return registerUserController;
};
exports.makeRegisterUserController = makeRegisterUserController;
