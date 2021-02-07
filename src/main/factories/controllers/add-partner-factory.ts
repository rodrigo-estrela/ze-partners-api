import { AddPartnerController } from '../../../presentation/controllers'
import { makeAddPartnerValidations } from './add-partner-validations-factory'
import { makeDbAddPartner } from '../usecases/db-add-partner-factory'

export const makeAddPartnerController = (): AddPartnerController => {
  const addPartnerController = new AddPartnerController(makeAddPartnerValidations(), makeDbAddPartner())
  return addPartnerController
}
