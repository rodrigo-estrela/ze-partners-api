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
})
