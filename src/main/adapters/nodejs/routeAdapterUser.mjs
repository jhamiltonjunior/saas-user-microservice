import { createServer } from 'http'
// import { createServer } from ''

// import { RegisterUserController } from '../../../adapters/http/controllers/users/registerUserController'
// import { AuthUserController } from '../../../adapters/http/controllers/users/authUserController'

// import { IHttpRequest } from '../../../adapters/http/controllers/ports/http'
// import { ShowUserController } from '@src/adapters/http/controllers/users/showUserController'

// export const adpterRoute = (controller:
//   RegisterUserController |
//   AuthUserController |
//   ShowUserController
// ): any => {
//   return async (req: IncomingMessage, res: ServerResponse) => {
//     const httpRequest: IHttpRequest = {
//       body: req.complete,
//       params: req.params
//     }

//     const httpResponse = await controller.handle(httpRequest)

//     res.status(httpResponse.statusCode).json(httpResponse.body)
//   }
// }

process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
