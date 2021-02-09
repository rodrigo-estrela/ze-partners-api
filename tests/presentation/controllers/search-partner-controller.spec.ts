import { SearchPartnerController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy, SearchNearestPartnerSpy } from '../mocks'

const request: SearchPartnerController.Request = { lon: 'any_long', lat: 'any_lat' }

type SutTypes = {
  sut: SearchPartnerController
  validationSpy: ValidationSpy
  searchNearestPartnerSpy: SearchNearestPartnerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const searchNearestPartnerSpy = new SearchNearestPartnerSpy()
  const sut = new SearchPartnerController(validationSpy, searchNearestPartnerSpy)

  return {
    sut,
    validationSpy,
    searchNearestPartnerSpy
  }
}

describe('SearchPartner Controller', () => {
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

  it('Should call SearchNearestPartner with correct values', async () => {
    const { sut, searchNearestPartnerSpy } = makeSut()
    await sut.handle(request)
    expect(searchNearestPartnerSpy.params).toEqual(request)
  })
})
