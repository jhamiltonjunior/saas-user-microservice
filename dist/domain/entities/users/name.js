"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const either_1 = require("../../../shared/either");
const invalidName_1 = require("./errors/invalidName");
class Name {
    constructor(name) {
        this.name = name;
        Object.freeze(this);
    }
    static create(name) {
        if (name !== undefined) {
            name = name.trim().replace(/( )+/g, ' ');
            if (!Name.validate(name)) {
                return (0, either_1.left)(new invalidName_1.InvalidNameError(name));
            }
        }
        return (0, either_1.right)(new Name(name));
    }
    get value() {
        return this.name;
    }
    static validate(name) {
        if (name !== undefined) {
            if (name.length < 2 || name.length > 255) {
                return false;
            }
        }
        return true;
    }
}
exports.Name = Name;
