import { SearchPartnerController } from '@/presentation/controllers'
import { ValidationSpy } from '../mocks'

const request: SearchPartnerController.Request = { lon: 'any_long', lat: 'any_lat' }

type SutTypes = {
  sut: SearchPartnerController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new SearchPartnerController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('SearchPartner Controller', () => {
  it('Should call validation with corret values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
