"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const httpHelper_1 = require("../helpers/httpHelper");
class DeleteUserController {
    constructor(userUseCases) {
        this.userUseCases = userUseCases;
    }
    async handle(httpRequest) {
        const url = httpRequest.params.id;
        try {
            const userResponse = await this.userUseCases.deleteUser(url);
            if (userResponse.isLeft()) {
                return (0, httpHelper_1.badRequest)(userResponse.value);
            }
            httpRequest.body = userResponse;
        }
        catch (error) {
            console.log(error);
            (0, httpHelper_1.serverError)('internal');
        }
        return (0, httpHelper_1.ok)(httpRequest.body);
    }
}
exports.DeleteUserController = DeleteUserController;
