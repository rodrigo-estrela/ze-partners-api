import { CheckPartnerByIdSpy, LoadPartnerByIdSpy } from '../mocks'
import { LoadPartnerController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { mockPartnerModel } from '@/tests/domain/mock-partner-model'

const request: LoadPartnerController.Request = {
  partnerId: 'any_id'
}

type SutTypes = {
  sut: LoadPartnerController
  checkPartnerByIdSpy: CheckPartnerByIdSpy
  loadPartnerByIdSpy: LoadPartnerByIdSpy
}

const makeSut = (): SutTypes => {
  const checkPartnerByIdSpy = new CheckPartnerByIdSpy()
  const loadPartnerByIdSpy = new LoadPartnerByIdSpy()
  const sut = new LoadPartnerController(checkPartnerByIdSpy, loadPartnerByIdSpy)

  return {
    sut,
    checkPartnerByIdSpy,
    loadPartnerByIdSpy
  }
}

describe('LoadPartner Controller', () => {
  it('Should call CheckPartnerById with correct value', async () => {
    const { sut, checkPartnerByIdSpy } = makeSut()
    await sut.handle(request)
    expect(checkPartnerByIdSpy.partnerId).toBe(request.partnerId)
  })

  it('Should return 403 if CheckPartnerById returns false', async () => {
    const { sut, checkPartnerByIdSpy } = makeSut()
    checkPartnerByIdSpy.result = false
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('partnerId')))
  })

  it('Should return 500 if CheckPartnerById throws', async () => {
    const { sut, checkPartnerByIdSpy } = makeSut()
    jest.spyOn(checkPartnerByIdSpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call LoadPartnerById with correct values', async () => {
    const { sut, loadPartnerByIdSpy } = makeSut()
    await sut.handle(request)
    expect(loadPartnerByIdSpy.partnerId).toBe(mockPartnerModel().id)
  })

  it('Should return 500 if LoadPartnerById throws', async () => {
    const { sut, loadPartnerByIdSpy } = makeSut()
    jest.spyOn(loadPartnerByIdSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut, loadPartnerByIdSpy } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadPartnerByIdSpy.result))
  })
})
