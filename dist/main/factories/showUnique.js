"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeShowUniqueUserController = void 0;
const userUseCases_1 = require("../../app/useCases/users/userUseCases");
const showUserController_1 = require("../../adapters/http/controllers/users/showUserController");
const bcrypt_1 = require("../../external/bcrypt/bcrypt");
const connectionObject_1 = require("./utils/connectionObject");
const postgresUserRepository_1 = require("@src/external/database/postgreSQL/user/postgresUserRepository");
const jwt_1 = require("@src/external/jwt/jwt");
const makeShowUniqueUserController = () => {
    const postgresUserRepository = new postgresUserRepository_1.PostgresUserRepository(connectionObject_1.connectionObject, bcrypt_1.generateHash, jwt_1.generateToken, bcrypt_1.comparePassword);
    const ShowUser = new userUseCases_1.UserUseCases(postgresUserRepository);
    const showUserController = new showUserController_1.ShowUserController(ShowUser);
    return showUserController;
};
exports.makeShowUniqueUserController = makeShowUniqueUserController;
