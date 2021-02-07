import { Router } from 'express'
import { makeAddPartnerController } from '../factories/controllers/add-partner-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export const partnerRoutes = (router: Router): void => {
  router.post('/partners', adaptRoute(makeAddPartnerController()))
}
