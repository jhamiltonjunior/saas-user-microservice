import { IUserData } from '../../../domain/entities/users/interfaces/userData'
import { IRegisterUserRepository } from '../../../app/repositories/userRepository'
import { PostgresHelper } from './helpers/postgresHelper'
import { v4 as uuidv4 } from 'uuid'

export class RegisterUserRepository implements IRegisterUserRepository {
  postgresHelper: PostgresHelper
  hash: (password: string) => Promise<string>

  constructor (
    connectionObject: object,
    hash: (password: string) => Promise<string>
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
    this.hash = hash
  }

  public async findAllUsers (): Promise<IUserData[]> {
    return await this.postgresHelper.reader('SELECT * FROM users', [])
  }

  public async findUserByEmail (email: string): Promise<IUserData> {
    const result = await this.postgresHelper.reader('SELECT * FROM users WHERE email = $1', [email])

    return result.rows[0]
  }

  public async add (user: IUserData): Promise<void> {
    const hash = await this.hash(user.password)

    await this.postgresHelper.reader(
      'INSERT INTO users(user_id, name, email, password) VALUES ($1, $2, $3, $4)',
      [uuidv4(), user.name, user.email, hash]
    )
  }

  public async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    console.log('external/postgreSQL/user/registeruser../', result)

    if (result != null) {
      if (result.email === email) {
        return true
      }
    }

    return false
  }
}
