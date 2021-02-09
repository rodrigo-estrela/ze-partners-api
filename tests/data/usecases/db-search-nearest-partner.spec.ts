import { SearchNearestPartnerRepositorySpy } from '../mocks'
import { DbSearchNearestPartner } from '@/data/usecases'

const location = { lon: 'any_lon', lat: 'any_lat' }

type SutTypes = {
  sut: DbSearchNearestPartner
  searchNearestPartnerRepositorySpy: SearchNearestPartnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const searchNearestPartnerRepositorySpy = new SearchNearestPartnerRepositorySpy()
  const sut = new DbSearchNearestPartner(searchNearestPartnerRepositorySpy)

  return {
    sut,
    searchNearestPartnerRepositorySpy
  }
}
describe('DbSearchNearestPartner Usecase', () => {
  it('Should call SearchNearestPartnerRepository with correct values', async () => {
    const { sut, searchNearestPartnerRepositorySpy } = makeSut()
    await sut.search(location)
    expect(searchNearestPartnerRepositorySpy.params).toBe(location)
  })

  it('Should throw if SearchNearestPartnerRepository throws', async () => {
    const { sut, searchNearestPartnerRepositorySpy } = makeSut()
    jest.spyOn(searchNearestPartnerRepositorySpy, 'search').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.search(location)
    await expect(promise).rejects.toThrow()
  })

  it('Should return PartnerModel on success', async () => {
    const { sut, searchNearestPartnerRepositorySpy } = makeSut()
    const partner = await sut.search(location)
    expect(partner).toEqual(searchNearestPartnerRepositorySpy.result)
  })
})
