import { NumberFieldValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): NumberFieldValidation => {
  const sut = new NumberFieldValidation('field')

  return sut
}

describe('NumberFieldValidation', () => {
  it('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'invalid_value' })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 0 })
    expect(error).toBeFalsy()
  })
})
