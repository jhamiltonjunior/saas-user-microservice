import { Request, Response } from 'express'

import { RegisterUserController } from '../../../adapters/http/controllers/users/registerUserController'
import { AuthUserController } from '../../../adapters/http/controllers/users/authUserController'

import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'
import { ShowUserController } from '@src/adapters/http/controllers/users/showUserController'
import { DeleteUserController } from '@src/adapters/http/controllers/users/DeleteUserController'

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

    console.log(httpRequest)

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
