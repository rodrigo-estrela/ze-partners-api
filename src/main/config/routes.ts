import { Express, Router } from 'express'
import { partnerRoutes } from '../routes'

export default (app: Express): void => {
  const router = Router()
  partnerRoutes(router)
  app.use('/api', router)
}
