import { Validation } from '@/presentation/protocols'
import { TypeParamError } from '@/presentation/errors'

export class NumberFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (isNaN(input[this.fieldName])) {
      return new TypeParamError(this.fieldName, 'number')
    }
  }
}
