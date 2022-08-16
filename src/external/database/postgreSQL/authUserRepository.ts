import { IUserAuthData } from '../../../domain/entities/users/interfaces/userData'
import { IAuthUserRepository } from '../../../app/repositories/userRepository'
import { PostgresHelper } from './helpers/postgresHelper'

export class AuthUserRepository implements IAuthUserRepository {
  private postgresHelper: PostgresHelper

  // private readonly hash: string
  public compare: (password: string, hash: string) => Promise<boolean>
  public generateToken: (id: string | undefined) => string

  constructor (
    connectionObject: object,
    compare: (password: string, hash: string) => Promise<boolean>,
    generateToken: (id: string | undefined) => string
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
    this.compare = compare
    this.generateToken = generateToken
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

  async comparePassword (password: string, hash: string): Promise<boolean> {
    const result = await this.compare(password, hash)
    if (result) {
      return true
    }

    return false
  }

  /** @deprecated */
  public async exists (email: string): Promise<boolean> {
    const query = await this.findUserByEmail(email)

    if (query != null) {
      if (query.email === email) {
        return true
      }
    }

    return false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async authenticateUser (id: string | undefined, token?: string | undefined): Promise<string> {
    return this.generateToken(id)
  }
}
