import { AddPartnerController } from '@/presentation/controllers'
import { makeAddPartnerValidations } from './add-partner-validations-factory'
import { makeDbAddPartner } from '../usecases'

export const makeAddPartnerController = (): AddPartnerController => {
  const addPartnerController = new AddPartnerController(makeAddPartnerValidations(), makeDbAddPartner())
  return addPartnerController
}
