import { RegisterUser } from '../../app/useCases/users/registerUser'
import { RegisterUserRepository } from '../../external/database/postgreSQL/registerUserRepository'
import { RegisterUserController } from '../../adapters/http/controllers/users/registerUserController'
import { generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '@src/external/database/postgreSQL/user/postgresUserRepository'
import { generateToken } from '@src/external/jwt/jwt'

export const makeRegisterUserController = (): RegisterUserController => {
  const postgresUserRepository = new PostgresUserRepository(connectionObject, generateHash, generateToken)
  const registerUser = new RegisterUser(postgresUserRepository)
  const registerUserController = new RegisterUserController(registerUser)
  return registerUserController
}
