import { Validation } from '@/presentation/protocols'
import { NumberFieldValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSearchNearestPartnerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['lon', 'lat']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new NumberFieldValidation('lon'))
  validations.push(new NumberFieldValidation('lat'))
  return new ValidationComposite(validations)
}
