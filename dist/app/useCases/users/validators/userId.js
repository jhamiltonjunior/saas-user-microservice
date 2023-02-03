"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const either_1 = require("../../../../shared/either");
const invalidUserId_1 = require("../errors/invalidUserId");
class UserId {
    constructor(userId) {
        this.userId = userId;
        Object.freeze(this);
    }
    static create(userId) {
        userId = userId.trim().replace(/( )+/g, '');
        if (!UserId.validate(userId)) {
            return (0, either_1.left)(new invalidUserId_1.InvalidUserIdError(userId));
        }
        return (0, either_1.right)(new UserId(userId));
    }
    get value() {
        return this.userId;
    }
    static validate(userId) {
        if (!userId) {
            return false;
        }
        return true;
    }
}
exports.UserId = UserId;
