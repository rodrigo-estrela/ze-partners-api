import { AddressValidatorAdapter, CoverageAreaValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { AddressValidation, CoverageAreaValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddPartnerValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CoverageAreaValidation('coverageArea', new CoverageAreaValidatorAdapter()))
  validations.push(new AddressValidation('address', new AddressValidatorAdapter()))

  return new ValidationComposite(validations)
}
