import { IUserData, IUserAuthData } from '../../../../domain/entities/users/interfaces/userData'
import { UserResponse } from '../registerUserResponse'
import { AuthUserResponse } from '../authUserResponse'

export interface UserInterface {
  registerUserOnDatabase: (user: IUserData) => Promise<UserResponse>
  authWithEmail: (user: IUserAuthData, password: string) => Promise<AuthUserResponse>
}
