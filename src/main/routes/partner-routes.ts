import { Router } from 'express'

export const partnerRoutes = (router: Router): void => {
  router.post('/partners', (req, res) => {
    res.send({ ok: 'ok' })
  })
}
