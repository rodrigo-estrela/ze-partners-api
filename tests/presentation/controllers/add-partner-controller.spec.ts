import { ValidationSpy, AddPartnerSpy } from '../mocks'
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
  addPartnerSpy: AddPartnerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPartnerSpy = new AddPartnerSpy()
  const sut = new AddPartnerController(validationSpy, addPartnerSpy)

  return {
    sut,
    validationSpy,
    addPartnerSpy
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

  it('Should return 400 if the Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const request = { body: mockedRequest }
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should call AddPartner with correct values', () => {
    const { sut, addPartnerSpy } = makeSut()
    const request = { body: mockedRequest }
    sut.handle(request)
    expect(addPartnerSpy.params).toEqual(request.body)
  })
})
