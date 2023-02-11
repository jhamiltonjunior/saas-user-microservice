import { Request, Response } from 'express'

import { RegisterUserController } from '../../../adapters/http/controllers/users/registerUserController'
import { AuthUserController } from '../../../adapters/http/controllers/users/authUserController'

import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'
import { ShowUserController } from '../../../adapters/http/controllers/users/showUserController'
import { DeleteUserController } from '../../../adapters/http/controllers/users/DeleteUserController'

export const adpterRoute = (controller:
  RegisterUserController |
  AuthUserController |
  ShowUserController |
  DeleteUserController
): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    // httpResponse.body.message

    // res.status(httpResponse.statusCode).json(httpResponse.body)

    // if (httpResponse.body.message === 'email exist') {
    //   res.status(httpResponse.statusCode).redirect(httpResponse.redirect)
    // }

    // if (
    //   httpResponse.body.message === 'success'
    // ) {
    //   res.status(httpResponse.statusCode)
    //     .redirect(httpResponse.redirect)
    // }

    // if (
    //   httpResponse.body.message === 'email exist'
    // ) {
    //   res.status(httpResponse.statusCode)
    //     .redirect(httpResponse.redirect)
    // }

    res.status(httpResponse.statusCode)
      .redirect(httpResponse.redirect)
  }
}
