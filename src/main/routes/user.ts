import { Router, Request, Response, NextFunction } from 'express'
import { routeAdapterToAuthenticate } from '../adapters/express/routeAdapterToAuthenticate'
import { routeAdapterToRegister } from '../adapters/express/routeAdapterToRegister'
import { routeAdapterToShowUser } from '../adapters/express/routeAdapterToShow'
import { routeAdapterToDelete } from '../adapters/express/routeAdapterToDelete'
import { makeAuthUserController } from '../factories/authenticate'
import { makeDeleteUserController } from '../factories/delete'
import { makeRegisterUserController } from '../factories/register'
import { makeShowUniqueUserController } from '../factories/showUnique'
import { auth } from '../middleware/authOnly'

export default (router: Router): void => {
  router.post('/user/auth', routeAdapterToAuthenticate(makeAuthUserController()))

  router.post('/user/register', routeAdapterToRegister(makeRegisterUserController()))

  router.delete('/user/:id', routeAdapterToDelete(makeDeleteUserController()))

  router.get('/user/:id', routeAdapterToShowUser(makeShowUniqueUserController()))

  router.get('/user/test', (req: Request, res: Response) => {
    res.json({
      message: 'Funcionando!'
    })
  })
}
