import { AddressValidation } from '../../../src/validation/validators'
import { AddressValidatorSpy } from '../mocks'
import { InvalidParamError } from '../../../src/presentation/errors'

const fieldName = 'address'

type SutTypes = {
  sut: AddressValidation
  addressValidatorSpy: AddressValidatorSpy
}

const makeSut = (): SutTypes => {
  const addressValidatorSpy = new AddressValidatorSpy()
  const sut = new AddressValidation(fieldName, addressValidatorSpy)

  return {
    sut,
    addressValidatorSpy
  }
}

describe('AddressValidation', () => {
  it('Should return an error if AddressValidator returns false', () => {
    const { sut, addressValidatorSpy } = makeSut()
    addressValidatorSpy.isAddressValid = false
    const error = sut.validate({ [fieldName]: 'valid_address' })
    expect(error).toEqual(new InvalidParamError(fieldName))
  })

  it('Should throw if AddressValidator throws', () => {
    const { sut, addressValidatorSpy } = makeSut()
    jest.spyOn(addressValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
