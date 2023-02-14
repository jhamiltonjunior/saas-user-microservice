import { Router, Request, Response } from 'express'
import { routeAdapterToAuthenticate } from '../adapters/express/routeAdapterToAuthenticate'
import { routeAdapterToRegister } from '../adapters/express/routeAdapterToRegister'
import { routeAdapterToShowUser } from '../adapters/express/routeAdapterToShow'
import { routeAdapterToDelete } from '../adapters/express/routeAdapterToDelete'
import { makeAuthUserController } from '../factories/authenticate'
import { makeDeleteUserController } from '../factories/delete'
import { makeRegisterUserController } from '../factories/register'
import { makeShowUniqueUserController } from '../factories/showUnique'

export default (router: Router): void => {
  router.post('/user', routeAdapterToAuthenticate(makeAuthUserController()))
  router.get('/user/:id', routeAdapterToShowUser(makeShowUniqueUserController()))

  router.post('/user/register', routeAdapterToRegister(makeRegisterUserController()))

  router.delete('/user/:id', routeAdapterToDelete(makeDeleteUserController()))

  router.get('/user/test', (req: Request, res: Response) => {
    res.json({
      message: 'Funcionando!'
    })
  })
}
