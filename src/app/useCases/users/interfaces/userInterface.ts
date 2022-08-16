import { IUserData, IUserAuthData } from '../../../../domain/entities/users/interfaces/userData'
import { UserResponse } from '../userResponse'
import { AuthUserResponse } from '../authUserResponse'

export interface UserInterface {
  registerUserOnDatabase: (user: IUserData) => Promise<UserResponse>
  authWithEmail: (user: IUserAuthData, password: string) => Promise<AuthUserResponse>
}
