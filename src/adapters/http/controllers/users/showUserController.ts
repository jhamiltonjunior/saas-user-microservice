import { UserUseCases } from '@src/app/useCases/users/userUseCases'
import { IUserData } from '@src/domain/entities/users/interfaces/userData'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class ShowUserController {
  private readonly registerUser: UserUseCases

  constructor (registerUser: UserUseCases) {
    this.registerUser = registerUser
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const id = httpRequest.params.id
    const userData = {
      name: '',
      email: '',
      password: ''
    }

    try {
      if (!httpRequest.params.id) {
        const field = httpRequest.params.id = 'id'

        return badRequest(new MissingParamError(field))
      }

      const showUserResponse: IUserData =
        await this.registerUser.showUniqueUser(id)

      if (showUserResponse.name) userData.name = showUserResponse.name
      userData.email = showUserResponse.email
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return created(userData)
  }
}
