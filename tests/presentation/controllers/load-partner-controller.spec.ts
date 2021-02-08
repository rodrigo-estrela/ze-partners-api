import { CheckPartnerByIdSpy } from '../mocks'
import { LoadPartnerController } from '@/presentation/controllers'
import { forbidden } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

const request: LoadPartnerController.Request = {
  partnerId: 'valid_id'
}

type SutTypes = {
  sut: LoadPartnerController
  checkPartnerByIdSpy: CheckPartnerByIdSpy
}

const makeSut = (): SutTypes => {
  const checkPartnerByIdSpy = new CheckPartnerByIdSpy()
  const sut = new LoadPartnerController(checkPartnerByIdSpy)

  return {
    sut,
    checkPartnerByIdSpy
  }
}

describe('LoadPartner Controller', () => {
  it('Should call CheckPartnerById with correct value', async () => {
    const { sut, checkPartnerByIdSpy } = makeSut()
    await sut.handle(request)
    expect(checkPartnerByIdSpy.partnerId).toBe(request.partnerId)
  })

  test('Should return 403 if CheckPartnerById returns false', async () => {
    const { sut, checkPartnerByIdSpy } = makeSut()
    checkPartnerByIdSpy.result = false
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('partnerId')))
  })
})
