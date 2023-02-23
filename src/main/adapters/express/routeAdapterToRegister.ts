import { Request, Response } from 'express'

import { RegisterUserController } from '../../../adapters/http/controllers/users/registerUserController'
import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'
import { createClient } from './utils/createClientPayment'
import { sendAuthorization } from './utils/sendAuthorization'

export const routeAdapterToRegister = (controller:
  RegisterUserController
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

    if (httpResponse.statusCode !== 201) {
      res.status(httpResponse.statusCode)
        .redirect(`${process.env.ADMIN}/register`)
    }

    console.log(httpResponse)

    if (httpResponse.statusCode === 201) {
      httpResponse.body.password = '';

      (async () => {
        // eslint-disable-next-line no-undef
        const data = await createClient(httpResponse)
        console.log(data.status)

        if (data.status === 200) {
          const json = await data.json()

          sendAuthorization(`${json.id} ${httpResponse.body.email}`)
        }
      })()
      res.status(httpResponse.statusCode)
        .redirect(`${process.env.ADMIN}/login`)
    }
  }
}
