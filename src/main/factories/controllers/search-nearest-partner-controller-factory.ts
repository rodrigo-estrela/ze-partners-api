import { SearchNearestPartnerController } from '@/presentation/controllers'
import { makeDbSearchNearestPartner } from '../usecases'
import { makeSearchNearestPartnerValidation } from './search-nearest-partner-validation-factory'

export const makeSearchNearestPartnerController = (): SearchNearestPartnerController => {
  const searchNearestPartnerController = new SearchNearestPartnerController(
    makeSearchNearestPartnerValidation(),
    makeDbSearchNearestPartner()
  )
  return searchNearestPartnerController
}
