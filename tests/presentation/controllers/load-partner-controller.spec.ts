import { CheckPartnerByIdSpy } from '../mocks'
import { LoadPartnerController } from '@/presentation/controllers'

const request = {
  body: {
    id: 'valid_id'
  }
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
    expect(checkPartnerByIdSpy.partnerId).toBe(request.body.id)
  })
})
