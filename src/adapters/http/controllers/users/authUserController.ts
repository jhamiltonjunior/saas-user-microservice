import { AuthUserResponse } from '../../../../app/useCases/users/authUserResponse'
import { AuthUser } from '../../../../app/useCases/users/authUser'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from '../ports/http'

export class AuthUserController {
  private readonly authUser: AuthUser
  // public readonly hash: string

  constructor (authUser: AuthUser) {
    this.authUser = authUser
    // this.hash = hash
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const authData = {
      email: httpRequest.body.email,
      password: httpRequest.body.password
    }

    try {
      if (!httpRequest.body.email || !httpRequest.body.password) {
        const field = httpRequest.body ? 'email' : 'password'

        return badRequest(new MissingParamError(field))
      }

      const authUserResponse: AuthUserResponse =
        await this.authUser.authWithEmail(authData)

      if (authUserResponse.isLeft()) {
        return badRequest(authUserResponse.value)
      }
    } catch (error) {
      process.stdout.write(String(error))
      serverError('internal')
    }

    return ok(authData)
  }
}
