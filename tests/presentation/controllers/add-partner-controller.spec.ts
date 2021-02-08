import { ValidationSpy, AddPartnerSpy } from '../mocks'
import { AddPartnerController } from '@/presentation/controllers'
import { serverError, badRequest, forbidden } from '@/presentation/helpers'
import { DocumentInUseError } from '@/presentation/errors'

let request: AddPartnerController.Request

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
    request = {
      tradingName: 'any_trading_name',
      ownerName: 'any_owner_name',
      document: 'any_document',
      coverageArea: {
        type: 'valid_type',
        coordinates: []
      },
      address: {
        type: 'valid_type',
        coordinates: []
      }
    }
  })

  it('Should call validation with corret values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  it('Should return 400 if the Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  it('Should call AddPartner with correct values', async () => {
    const { sut, addPartnerSpy } = makeSut()
    await sut.handle(request)
    expect(addPartnerSpy.params).toEqual(request)
  })

  it('Should should return 403 if document is already in use', async () => {
    const { sut, addPartnerSpy } = makeSut()
    jest.spyOn(addPartnerSpy, 'add').mockResolvedValueOnce(null)
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new DocumentInUseError()))
  })

  it('Should return 500 if AddPartner throws', async () => {
    const { sut, addPartnerSpy } = makeSut()
    jest.spyOn(addPartnerSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
  })
})
