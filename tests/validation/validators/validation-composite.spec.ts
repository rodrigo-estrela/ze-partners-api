import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)

  return {
    sut,
    validationSpies
  }
}

describe('ValidationComposite', () => {
  it('Should return an error if any of the validators fails', () => {
    const { sut, validationSpies } = makeSut()
    const field = 'missing_field'
    validationSpies[1].error = new Error(`Missing Param: ${field}`)
    const error = sut.validate({ field: 'valid_field' })
    expect(error).toEqual(validationSpies[1].error)
  })
})
