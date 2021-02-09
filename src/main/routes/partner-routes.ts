import { Router } from 'express'
import { makeAddPartnerController } from '../factories/controllers/add-partner-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadPartnerController } from '../factories/controllers/load-partner-factirory'

export const partnerRoutes = (router: Router): void => {
  router.post('/partners', adaptRoute(makeAddPartnerController()))
  router.get('/partners/:partnerId', adaptRoute(makeLoadPartnerController()))
}
