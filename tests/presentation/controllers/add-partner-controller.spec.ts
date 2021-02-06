import { ValidationSpy, AddPartnerSpy } from '../mocks'
import { AddPartnerController } from '@/presentation/controllers'
import { serverError, ok } from '@/presentation/helpers'

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

  it('Should call validation with corret values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = { body: mockedRequest }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  it('Should return 400 if the Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const request = { body: mockedRequest }
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should call AddPartner with correct values', async () => {
    const { sut, addPartnerSpy } = makeSut()
    const request = { body: mockedRequest }
    await sut.handle(request)
    expect(addPartnerSpy.params).toEqual(request.body)
  })

  it('Should return 500 if AddPartner throws', async () => {
    const { sut, addPartnerSpy } = makeSut()
    jest.spyOn(addPartnerSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const request = { body: mockedRequest }
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = { body: mockedRequest }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
  })
})
