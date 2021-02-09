import { LoadPartnerController } from '@/presentation/controllers'
import { makeDbLoadPartnerById } from '../usecases'

export const makeLoadPartnerController = (): LoadPartnerController => {
  const loadPartnerController = new LoadPartnerController(makeDbLoadPartnerById())

  return loadPartnerController
}
