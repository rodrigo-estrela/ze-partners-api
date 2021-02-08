import { DbCheckPartnerById } from '@/data/usecases'
import { CheckPartnerByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCheckPartnerById
  checkPartnerByIdRepositorySpy: CheckPartnerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPartnerByIdRepositorySpy = new CheckPartnerByIdRepositorySpy()
  const sut = new DbCheckPartnerById(checkPartnerByIdRepositorySpy)
  return {
    sut,
    checkPartnerByIdRepositorySpy
  }
}

const partnerId: string = 'any_id'

describe('DbCheckPartnerById', () => {
  test('Should call CheckPartnerById', async () => {
    const { sut, checkPartnerByIdRepositorySpy } = makeSut()
    await sut.checkById(partnerId)
    expect(checkPartnerByIdRepositorySpy.id).toBe(partnerId)
  })

  test('Should return true if CheckPartnerById returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(partnerId)
    expect(exists).toBe(true)
  })

  test('Should return false if CheckPartnerById returns false', async () => {
    const { sut, checkPartnerByIdRepositorySpy } = makeSut()
    checkPartnerByIdRepositorySpy.result = false
    const exists = await sut.checkById(partnerId)
    expect(exists).toBe(false)
  })

  test('Should throw if CheckPartnerById throws', async () => {
    const { sut, checkPartnerByIdRepositorySpy } = makeSut()
    jest.spyOn(checkPartnerByIdRepositorySpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.checkById(partnerId)
    await expect(promise).rejects.toThrow()
  })
})
