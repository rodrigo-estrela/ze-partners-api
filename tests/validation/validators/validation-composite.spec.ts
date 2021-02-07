import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '../../../src/validation/validators'

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

  it('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error('first_error')
    validationSpies[1].error = new Error('second_error')
    const error = sut.validate({ field: 'valid_field' })
    expect(error).toEqual(validationSpies[0].error)
  })

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'valid_field' })
    expect(error).toBeFalsy()
  })
})
