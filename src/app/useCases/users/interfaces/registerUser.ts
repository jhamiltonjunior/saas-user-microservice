import { IUserData } from '../../../../domain/entities/users/interfaces/userData'
import { UserResponse } from '../registerUserResponse'

export interface IRegisterUser {
  registerUserOnDatabase: (user: IUserData) => Promise<UserResponse>
}
