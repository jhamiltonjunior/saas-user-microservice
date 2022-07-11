import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '@src/external/database/postgreSQL/user/postgresUserRepository'
import { generateToken } from '@src/external/jwt/jwt'
import { RegisterUserController } from '@src/adapters/http/controllers/users/registerUserController'
import { UserUseCases } from '@src/app/useCases/users/userUseCases'
// import { RegisterUser } from '@src/app/useCases/users/registerUser'

export const makeRegisterUserController = (): RegisterUserController => {
  const postgresUserRepository = new PostgresUserRepository(connectionObject, generateHash, generateToken, comparePassword)
  const registerUser = new UserUseCases(postgresUserRepository)
  const registerUserController = new RegisterUserController(registerUser)
  return registerUserController
}
