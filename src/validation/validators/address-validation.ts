import { Validation } from '@/presentation/protocols'
import { AddressValidator } from '@/validation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class AddressValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly coverageAreaValidator: AddressValidator) { }

  validate (input: any): Error {
    const isValid = this.coverageAreaValidator.isValid(input)
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
