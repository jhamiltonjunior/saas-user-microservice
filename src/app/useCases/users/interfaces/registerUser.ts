import { IUserData } from '../../../../domain/entities/users/interfaces/userData'
import { RegisterUserResponse } from '../registerUserResponse'

export interface IRegisterUser {
  registerUserOnDatabase: (user: IUserData) => Promise<RegisterUserResponse>
}
