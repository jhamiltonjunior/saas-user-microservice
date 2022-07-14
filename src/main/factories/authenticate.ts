import { generateToken } from '../../external/jwt/jwt'
import { AuthUserController } from '../../adapters/http/controllers/users/authUserController'
import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { UserUseCases } from '@src/app/useCases/users/userUseCases'
import { PostgresUserRepository } from 'src/external/database/postgreSQL/user/postgresUserRepository'

export const makeAuthUserController = (): AuthUserController => {
  const authUserRepository = new PostgresUserRepository(connectionObject, generateHash, generateToken, comparePassword)
  const authUser = new UserUseCases(authUserRepository)
  const authUserController = new AuthUserController(authUser)
  console.log(authUser)
  return authUserController
}
