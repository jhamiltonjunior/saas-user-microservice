import { IUserAuthData, IUserData } from '@src/domain/entities/users/interfaces/userData'
import { IUserRepository } from '../../../../app/repositories/userRepository'
import { PostgresHelper } from '../helpers/postgresHelper'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line camelcase
type AuthorData = { user_id: string, name: string }

export class PostgresUserRepository implements IUserRepository {
  postgresHelper: PostgresHelper
  hash: (password: string) => Promise<string>
  public generateToken: (id: string | undefined) => string

  constructor (
    connectionObject: object,
    hash: (password: string) => Promise<string>,
    generateToken: (id: string | undefined) => string
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
    this.generateToken = generateToken
    this.hash = hash
  }

  async findUserById (id: string): Promise<AuthorData> {
    const result = await this.postgresHelper.query('SELECT * FROM users WHERE user_id = $1', [id])

    return result.rows[0]
  }

  public async add (user: IUserData): Promise<void> {
    const hash = await this.hash(user.password)

    const result = await this.postgresHelper.reader(
      `INSERT INTO users(
        user_id, name, email, password
      )
      VALUES (
        $1, $2, $3, $4
      )
      RETURNING user_id`,
      [uuidv4(), user.name, user.email, hash]
    )

    // Create default permission (reader) for news users
    await this.generateDefaultPermission(
      result.rows[0].user_id,
      '9e13b046-af01-48e9-8418-d72e2773486f'
    )
  }

  // This method create permission to gerenciar the actions of users
  public async generateDefaultPermission (userId: string, permissionId: string): Promise<void> {
    await this.postgresHelper.writer(
      `INSERT INTO users_permissions(
        users_permissions_id, user_id, permissions_id
      )
      VALUES (
        $1, $2, $3
      )`,
      [uuidv4(), userId, permissionId]
    )
  }

  public async findUserByEmail (email: string): Promise<IUserAuthData> {
    const result = await this.postgresHelper.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    // console.log('AuthUserRepository', result)
    // console.log('AuthUserRepository', result.rows[0])

    return result.rows[0]
  }

  public async exists (email: string): Promise<boolean> {
    const query = await this.findUserByEmail(email)

    if (query != null) {
      if (query.email === email) {
        return true
      }
    }

    return false
  }

  public async authenticateUser (id: string | undefined): Promise<string> {
    return this.generateToken(id)
  }

  async getPermission (id: string): Promise<string> {
    const usersPermissions = await this.postgresHelper.reader(
      `
        SELECT *
        FROM users_permissions
        WHERE user_id = $1`,
      [id]
    )

    const permissionsId: any[] = []

    usersPermissions.rows.forEach((column: any) => {
      permissionsId.push(column.permissions_id)
    })

    const permissionsNameToArrays = permissionsId.map(async (id: string): Promise<string> => {
      const permissions = await this.postgresHelper.reader(
        `
          SELECT *
          FROM permissions
          WHERE permissions_id = $1`,
        [id]
      )

      return permissions.rows[0].name
    })

    let permissionsName: string = ''

    for (const value of permissionsNameToArrays) {
      permissionsName += `${(await value).toString()} `
    }

    // I am return all permissions of one user
    return permissionsName.trim()
  }
}
