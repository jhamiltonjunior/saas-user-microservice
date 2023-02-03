"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const postgresHelper_1 = require("../helpers/postgresHelper");
const uuid_1 = require("uuid");
class PostgresUserRepository {
    constructor(connectionObject, hash, generateToken, compare) {
        this.postgresHelper = new postgresHelper_1.PostgresHelper(connectionObject);
        this.generateToken = generateToken;
        this.compare = compare || undefined;
        this.hash = hash;
    }
    async findUserById(id) {
        const result = await this.postgresHelper.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return result.rows[0];
    }
    async add(user) {
        const hash = await this.hash(user.password);
        const result = await this.postgresHelper.reader(`INSERT INTO users(
        user_id, name, email, password
      )
      VALUES (
        $1, $2, $3, $4
      )
      RETURNING user_id`, [(0, uuid_1.v4)(), user.name, user.email, hash]);
        await this.generateDefaultPermission(result.rows[0].user_id, '9383cece-d865-446b-98b2-7ff40881b4bc');
    }
    async generateDefaultPermission(userId, permissionId) {
        await this.postgresHelper.writer(`INSERT INTO users_permissions(
        users_permissions_id, user_id, permissions_id
      )
      VALUES (
        $1, $2, $3
      )`, [(0, uuid_1.v4)(), userId, permissionId]);
    }
    async findUserByEmail(email) {
        const result = await this.postgresHelper.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
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
    async authenticateUser(id) {
        return this.generateToken(id);
    }
    async getPermission(id) {
        const usersPermissions = await this.postgresHelper.reader(`
        SELECT *
        FROM users_permissions
        WHERE user_id = $1`, [id]);
        const permissionsId = [];
        usersPermissions.rows.forEach((column) => {
            permissionsId.push(column.permissions_id);
        });
        const permissionsNameToArrays = permissionsId.map(async (id) => {
            const permissions = await this.postgresHelper.reader(`
          SELECT *
          FROM permissions
          WHERE permissions_id = $1`, [id]);
            return permissions.rows[0].name;
        });
        let permissionsName = '';
        for (const value of permissionsNameToArrays) {
            permissionsName += `${(await value).toString()} `;
        }
        return permissionsName.trim();
    }
    async comparePassword(password, hash) {
        const result = await this.compare(password, hash);
        if (result) {
            return true;
        }
        return false;
    }
    async update(user, tokenId) {
        const hash = await this.hash(user.password);
        await this.postgresHelper.writer(`
      UPDATE users
      SET
        name = $1,
        email = $2,
        password = $3
      
      WHERE
        user_id = $4`, [user.name, user.email, hash, tokenId]);
    }
    async deleteById(id) {
        await this.postgresHelper.writer(`
      DELETE FROM users
      WHERE user_id = $1
    `, [
            id
        ]);
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
