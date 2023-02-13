import { Request, Response, NextFunction } from 'express'
import { validateUser } from '../../external/jwt/jwt'

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers

  if (!authorization) { res.status(401).json({ message: 'no token provided' }) }

  const parts = authorization?.split(' ')

  if (authorization !== undefined) {
    if (parts?.length !== 2) { res.status(401).json({ message: 'Token erro' }) }

    const [schema, token] = (<any>parts)

    if (!/^Bearer$/i.test(schema)) { res.status(401).json({ message: 'Token malformatted' }) }

    try {
      const id = validateUser(token)
      if (id === '') {
        res.status(401).json({ message: 'invalid token' })
      }
      // jwt.verify(token, process.env.KEY_FOR_WRITER, (err, decoded) => {
      //   if (err) {
      //     res.status(401).json({ message: 'Erro ao autenticar o token' })
      //   }

      //   client.idPeople = decoded.id

      return next()
      // })
    } catch (err) {
      console.log('main/middleware', err)
      res.status(401).json({ message: 'invalid token' })
    }
  }

  next()
}
