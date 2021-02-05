import { Validation } from '@/presentation/protocols'
import { CoverageAreaValidator } from '@/validation/protocols'

export class CoverageAreaValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly coverageAreaValidator: CoverageAreaValidator) { }

  validate (input: any): Error {
    const isValid = this.coverageAreaValidator.isValid(input)
    if (!isValid) {
      return new Error(`Invalid Param: ${this.fieldName}`)
    }
  }
}
