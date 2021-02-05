import { ValidationSpy } from '../mocks'
import { AddPartnerController } from '@/presentation/controllers'

type MockedRequest = {
  tradingName: string
  ownerName: string
  document: string
  coverageArea: any
  address: any
}

let mockedRequest: MockedRequest

type SutTypes = {
  sut: AddPartnerController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddPartnerController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('AddPartnerController', () => {
  beforeEach(() => {
    mockedRequest = {
      tradingName: 'any_trading_name',
      ownerName: 'any_owner_name',
      document: 'any_document',
      coverageArea: {
        type: 'valid_type',
        coordinates: 'valid_coordinates'
      },
      address: {
        type: 'valid_type',
        coordinates: 'valid_coordinates'
      }
    }
  })

  it('Should call validation with corret values', () => {
    const { sut, validationSpy } = makeSut()
    const request = { body: mockedRequest }
    sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
