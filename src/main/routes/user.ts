import { Router, Request, Response } from 'express'
import { adpterRoute } from '../adapters/express/routeAdapterUser'
import { makeAuthUserController } from '../factories/authenticate'
import { makeRegisterUserController } from '../factories/register'

export default (router: Router): void => {
  router.get('/user', adpterRoute(makeAuthUserController()))
  router.post('/user', adpterRoute(makeRegisterUserController()))

  router.get('/user/test', (req: Request, res: Response) => {
    res.json({
      message: 'Funcionando!'
    })
  })
}
