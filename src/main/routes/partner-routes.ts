import { Router } from 'express'
import {
  makeAddPartnerController,
  makeLoadPartnerController,
  makeSearchNearestPartnerController
} from '../factories/controllers'
import { adaptRoute } from '../adapters'

export const partnerRoutes = (router: Router): void => {
  router.post('/partners', adaptRoute(makeAddPartnerController()))
  router.get('/partners/search', adaptRoute(makeSearchNearestPartnerController()))
  router.get('/partners/:partnerId', adaptRoute(makeLoadPartnerController()))
}
