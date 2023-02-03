"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserRepository = void 0;
const postgresHelper_1 = require("./helpers/postgresHelper");
const uuid_1 = require("uuid");
class RegisterUserRepository {
    constructor(connectionObject, hash) {
        this.postgresHelper = new postgresHelper_1.PostgresHelper(connectionObject);
        this.hash = hash;
    }
    async findAllUsers() {
        return await this.postgresHelper.reader('SELECT * FROM users', []);
    }
    async findUserByEmail(email) {
        const result = await this.postgresHelper.reader('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    async add(user) {
        const hash = await this.hash(user.password);
        console.log('"add" method');
        await this.postgresHelper.reader('INSERT INTO users(user_id, name, email, password) VALUES ($1, $2, $3, $4)', [(0, uuid_1.v4)(), user.name, user.email, hash]);
    }
    async exists(email) {
        const result = await this.findUserByEmail(email);
        console.log('result', result);
        if (result != null) {
            if (result.email === email) {
                return true;
            }
        }
        return false;
    }
}
exports.RegisterUserRepository = RegisterUserRepository;
