"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowUserController = void 0;
const missingParamError_1 = require("../errors/missingParamError");
const httpHelper_1 = require("../helpers/httpHelper");
class ShowUserController {
    constructor(registerUser) {
        this.registerUser = registerUser;
    }
    async handle(httpRequest) {
        const id = httpRequest.params.id;
        const userData = {
            name: '',
            email: '',
            password: ''
        };
        try {
            if (!httpRequest.params.id) {
                const field = httpRequest.params.id = 'id';
                return (0, httpHelper_1.badRequest)(new missingParamError_1.MissingParamError(field));
            }
            const showUserResponse = await this.registerUser.showUniqueUser(id);
            if (showUserResponse.name)
                userData.name = showUserResponse.name;
            userData.email = showUserResponse.email;
        }
        catch (error) {
            process.stdout.write(String(error));
            (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.created)(userData);
    }
}
exports.ShowUserController = ShowUserController;
