import cors from 'cors'
import { Express, urlencoded } from 'express'
import { bodyParser, contentType } from '../middleware'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(urlencoded({ extended: true }))
  app.use(contentType)
  cors()
}
