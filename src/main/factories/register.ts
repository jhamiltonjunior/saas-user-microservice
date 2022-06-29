import { comparePassword, generateHash } from '../../external/bcrypt/bcrypt'
import { connectionObject } from './utils/connectionObject'
import { PostgresUserRepository } from '@src/external/database/postgreSQL/user/postgresUserRepository'
import { generateToken } from '@src/external/jwt/jwt'
import { ShowUserController } from '@src/adapters/http/controllers/users/showUserController'
import { UserUseCases } from '@src/app/useCases/users/userUseCases'

export const makeRegisterUserController = (): ShowUserController => {
  const postgresUserRepository = new PostgresUserRepository(connectionObject, generateHash, generateToken, comparePassword)
  const showUser = new UserUseCases(postgresUserRepository)
  const showUserController = new ShowUserController(showUser)
  return showUserController
}
