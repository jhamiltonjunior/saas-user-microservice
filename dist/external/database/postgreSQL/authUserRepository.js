"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserRepository = void 0;
const postgresHelper_1 = require("./helpers/postgresHelper");
class AuthUserRepository {
    constructor(connectionObject, compare, generateToken) {
        this.postgresHelper = new postgresHelper_1.PostgresHelper(connectionObject);
        this.compare = compare;
        this.generateToken = generateToken;
    }
    async findUserByEmail(email) {
        const result = await this.postgresHelper.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    async comparePassword(password, hash) {
        const result = await this.compare(password, hash);
        if (result) {
            return true;
        }
        return false;
    }
    async exists(email) {
        const query = await this.findUserByEmail(email);
        if (query != null) {
            if (query.email === email) {
                return true;
            }
        }
        return false;
    }
    async authenticateUser(id, token) {
        return this.generateToken(id);
    }
}
exports.AuthUserRepository = AuthUserRepository;
