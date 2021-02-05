import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new Error(`Missing Param: ${this.fieldName}`)
    }
  }
}
