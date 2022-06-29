import { UserUseCases } from '../../app/useCases/users/userUseCases'
import { RegisterUserController } from '../../adapters/http/controllers/users/registerUserController'
import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '@src/external/database/postgreSQL/user/postgresUserRepository'
import { generateToken } from '@src/external/jwt/jwt'

export const makeShowUniqueUserController = (): RegisterUserController => {
  const postgresUserRepository = new PostgresUserRepository(
    connectionObject, generateHash, generateToken, comparePassword
  )
  const registerUser = new UserUseCases(postgresUserRepository)
  const registerUserController = new RegisterUserController(registerUser)
  return registerUserController
}
