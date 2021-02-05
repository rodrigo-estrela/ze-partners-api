import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  validationsSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationsSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationsSpies)

  return {
    sut,
    validationsSpies
  }
}

describe('ValidationComposite', () => {
  it('Should return an error if any of the validators fails', () => {
    const { sut, validationsSpies } = makeSut()
    const field = 'missing_field'
    validationsSpies[1].error = new Error(`Missing Param: ${field}`)
    const error = sut.validate({ field: 'valid_field' })
    expect(error).toEqual(validationsSpies[1].error)
  })
})
