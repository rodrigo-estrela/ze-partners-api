import { DbLoadPartnerById } from '@/data/usecases'
import { LoadPartnerByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadPartnerById
  loadPartnerRepositorySpy: LoadPartnerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPartnerRepositorySpy = new LoadPartnerByIdRepositorySpy()
  const sut = new DbLoadPartnerById(loadPartnerRepositorySpy)
  return {
    sut,
    loadPartnerRepositorySpy
  }
}

const partnerId: string = 'any_id'

describe('DbLoadPartnerResult UseCase', () => {
  it('Should call LoadPartnerRepository with correct values', async () => {
    const { sut, loadPartnerRepositorySpy } = makeSut()
    await sut.loadById(partnerId)
    expect(loadPartnerRepositorySpy.id).toBe(partnerId)
  })

  it('Should throw if LoadPartnerRepository throws', async () => {
    const { sut, loadPartnerRepositorySpy } = makeSut()
    jest.spyOn(loadPartnerRepositorySpy, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.loadById(partnerId)
    await expect(promise).rejects.toThrow()
  })

  it('Should return PartnerModel on success', async () => {
    const { sut, loadPartnerRepositorySpy } = makeSut()
    const partner = await sut.loadById(partnerId)
    expect(partner).toEqual(loadPartnerRepositorySpy.result)
  })
})
