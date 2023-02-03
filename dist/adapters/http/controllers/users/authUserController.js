"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const missingParamError_1 = require("../errors/missingParamError");
const httpHelper_1 = require("../helpers/httpHelper");
class AuthUserController {
    constructor(authUser) {
        this.authUser = authUser;
    }
    async handle(httpRequest) {
        const authData = {
            email: httpRequest.body.email,
            password: httpRequest.body.password
        };
        try {
            if (!httpRequest.body.email || !httpRequest.body.password) {
                const field = httpRequest.body ? 'email' : 'password';
                return (0, httpHelper_1.badRequest)(new missingParamError_1.MissingParamError(field));
            }
            const authUserResponse = await this.authUser.authWithEmail(authData);
            if (authUserResponse.isLeft()) {
                return (0, httpHelper_1.badRequest)(authUserResponse.value);
            }
        }
        catch (error) {
            process.stdout.write(String(error));
            (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.ok)(authData);
    }
}
exports.AuthUserController = AuthUserController;
