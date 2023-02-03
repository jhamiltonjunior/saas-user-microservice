"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeAdapterUser_1 = require("../adapters/express/routeAdapterUser");
const authenticate_1 = require("../factories/authenticate");
const delete_1 = require("../factories/delete");
const register_1 = require("../factories/register");
const showUnique_1 = require("../factories/showUnique");
exports.default = (router) => {
    router.get('/user', (0, routeAdapterUser_1.adpterRoute)((0, authenticate_1.makeAuthUserController)()));
    router.get('/user/:id', (0, routeAdapterUser_1.adpterRoute)((0, showUnique_1.makeShowUniqueUserController)()));
    router.post('/user', (0, routeAdapterUser_1.adpterRoute)((0, register_1.makeRegisterUserController)()));
    router.delete('/user/:id', (0, routeAdapterUser_1.adpterRoute)((0, delete_1.makeDeleteUserController)()));
    router.get('/user/test', (req, res) => {
        res.json({
            message: 'Funcionando!'
        });
    });
};
