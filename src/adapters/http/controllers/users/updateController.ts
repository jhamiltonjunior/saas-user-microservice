import { AuthUserResponse } from '../../../../app/useCases/users/authUserResponse'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'
import { UserUseCases } from '../../../../app/useCases/users/userUseCases'

export class UpdateController {
  private readonly userUseCases: UserUseCases
  // public readonly hash: string

  constructor (useCases: UserUseCases) {
    this.userUseCases = useCases
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const updateData = {
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    try {
      if (!httpRequest.body.email || !httpRequest.body.password) {
        const field = httpRequest.body ? 'email' : 'password'

        return badRequest(new MissingParamError(field))
      }

      const updateUserResponse: AuthUserResponse =
        await this.userUseCases.updateUserOnDatabase(updateData)

      if (updateUserResponse.isLeft()) {
        return badRequest(updateUserResponse.value)
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return ok(updateData)
  }
}
