"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adpterRoute = void 0;
const adpterRoute = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            params: req.params
        };
        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
exports.adpterRoute = adpterRoute;
