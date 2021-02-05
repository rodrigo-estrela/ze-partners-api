import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('validField')

  return sut
}

describe('RequiredFieldValidation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: 'any_value' })
    expect(error).toEqual(new Error('Missing Param: validField'))
  })
})
