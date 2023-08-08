import { InvalidNameError } from '../../../domain/entities/users/errors/invalidName'
import { IUserAuthData, IUserData } from '../../../domain/entities/users/interfaces/userData'
import { Either, left, right } from '../../../shared/either'

import { IUserRepository } from '../../repositories/userRepository'
import { UserResponse } from './userResponse'
import { InvalidEmailError } from '../../../domain/entities/users/errors/invalidEmail'
import { InvalidPasswordError } from '../../../domain/entities/users/errors/invalidPassword'
import { User } from '../../../domain/entities/users/user'
import { AuthUserResponse } from './authUserResponse'
import { UserInterface } from './interfaces/userInterface'
import { UserId } from './validators/userId'
import { InvalidUserIdError } from './errors/invalidUserId'
import { DeleteUserResponse } from './responses/deleteUserResponse'
import { InvalidUserError } from './errors/invalidUser'

export class UserUseCases implements UserInterface {
  private readonly userRepository: IUserRepository

  constructor (registerRepo: IUserRepository) {
    this.userRepository = registerRepo
  }

  async registerUserOnDatabase (userData: IUserData): Promise<UserResponse> {
    const userOrError: Either<
    InvalidNameError | InvalidEmailError | InvalidPasswordError,
    User> = User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user: User = userOrError.value
    const exists = this.userRepository.exists(userData.email)

    if (!(await exists).valueOf()) {
      if (user.name !== undefined) {
        await this.userRepository.add({
          name: user.name.value,
          email: user.email.value,
          password: user.password.value
        })
      }
    }

    if ((await exists).valueOf()) {
      return left(new InvalidEmailError('email exist'))
    }

    return right(userData)
  }

  async authWithEmail (authData: IUserAuthData): Promise<AuthUserResponse> {
    const userOrError: Either<
    InvalidNameError |
    InvalidEmailError,
    User> = User.create(authData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const result = await this.userRepository.findUserByEmail(authData.email)
    const checkedPassword = await this.userRepository.comparePassword(
      // password of request body and password of database result
      authData.password, result.password
    )

    if (result.email && checkedPassword) {
      // I am attributing the jwt to property token of IUserAuthData
      authData.token = await this.userRepository.authenticateUser(result.user_id)
    } else if (authData.token === undefined) {
      authData.email = 'InvalidEmail'
      authData.password = 'InvalidPassword'
    }

    if (!result.email) {
      return left(new InvalidUserError('InvalidEmail', ''))
    }

    if (!checkedPassword) {
      return left(new InvalidUserError('', 'InvalidPassword'))
    }

    return right(authData)
  }

  /**
   * This method show a unique user
   * but not exist validation for verify uuid of params of request
   */
  async showUniqueUser (id: string): Promise<IUserData> {
    const user = await this.userRepository?.findUserById(id)

    return user
  }

  async deleteUser (id: string): Promise<DeleteUserResponse> {
    const idOrError = UserId.create(id)

    if (idOrError.isLeft()) {
      return left(new InvalidUserIdError(id))
    }

    const idValue = idOrError.value

    const user = await this.userRepository.findUserById(idValue.value)

    if (user.user_id !== undefined) {
      this.userRepository.deleteById(user.user_id)

      return right('User Deleted')
    }

    return left(new Error('User ID not found!'))
  }
}
