"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserController = void 0;
const missingParamError_1 = require("../errors/missingParamError");
const httpHelper_1 = require("../helpers/httpHelper");
class RegisterUserController {
    constructor(registerUser) {
        this.registerUser = registerUser;
    }
    async handle(httpRequest) {
        const userData = {
            name: httpRequest.body.name,
            email: httpRequest.body.email,
            password: httpRequest.body.password
        };
        try {
            if (!httpRequest.body.name) {
                const field = httpRequest.body.name = 'name';
                return (0, httpHelper_1.badRequest)(new missingParamError_1.MissingParamError(field));
            }
            const registerUserResponse = await this.registerUser.registerUserOnDatabase(userData);
            if (registerUserResponse.isLeft()) {
                return (0, httpHelper_1.badRequest)(registerUserResponse.value);
            }
        }
        catch (error) {
            process.stdout.write(String(error));
            (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.created)(userData);
    }
}
exports.RegisterUserController = RegisterUserController;
