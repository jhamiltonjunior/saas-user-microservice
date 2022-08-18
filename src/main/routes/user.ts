import { Router, Request, Response } from 'express'
import { adpterRoute } from '../adapters/express/routeAdapterUser'
import { makeAuthUserController } from '../factories/authenticate'
import { makeDeleteUserController } from '../factories/delete'
import { makeRegisterUserController } from '../factories/register'
import { makeShowUniqueUserController } from '../factories/showUnique'

export default (router: Router): void => {
  router.get('/user', adpterRoute(makeAuthUserController()))
  router.get('/user/:id', adpterRoute(makeShowUniqueUserController()))

  router.post('/user', adpterRoute(makeRegisterUserController()))

  router.delete('/user/:id', adpterRoute(makeDeleteUserController()))

  router.get('/user/test', (req: Request, res: Response) => {
    res.json({
      message: 'Funcionando!'
    })
  })
}
