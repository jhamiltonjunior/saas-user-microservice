import { RegisterUser } from '../../../../app/useCases/users/registerUser'
import { RegisterUserResponse } from '../../../../app/useCases/users/registerUserResponse'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, created, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class RegisterUserController {
  private readonly registerUser: RegisterUser

  constructor (registerUser: RegisterUser) {
    this.registerUser = registerUser
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const userData = {
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    try {
      if (!httpRequest.body.name) {
        const field = httpRequest.body.name = 'name'

        return badRequest(new MissingParamError(field))
      }

      const registerUserResponse: RegisterUserResponse =
        await this.registerUser.registerUserOnDatabase(userData)

      if (registerUserResponse.isLeft()) {
        return badRequest(registerUserResponse.value)
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return created(userData)
  }
}
