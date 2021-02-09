import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSearchNearestPartnerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['lon', 'lat']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
