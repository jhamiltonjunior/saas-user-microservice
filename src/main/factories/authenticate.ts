import { generateToken } from '../../external/jwt/jwt'
import { AuthUserController } from '../../adapters/http/controllers/users/authUserController'
import { AuthUser } from '../../app/useCases/users/authUser'
import { comparePassword } from '../../external/bcrypt/bcrypt'
import { AuthUserRepository } from '../../external/database/postgreSQL/authUserRepository'
import { connectionObject } from './utils/connectionObject'

export const makeAuthUserController = (): AuthUserController => {
  const authUserRepository = new AuthUserRepository(connectionObject, comparePassword, generateToken)
  const authUser = new AuthUser(authUserRepository)
  const authUserController = new AuthUserController(authUser)
  // console.log(authUserController)
  return authUserController
}
