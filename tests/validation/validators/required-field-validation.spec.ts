import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('valid_field')

  return sut
}

describe('RequiredFieldValidation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: 'any_value' })
    expect(error).toEqual(new MissingParamError('valid_field'))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ valid_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
