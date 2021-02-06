import { AddPartnerRepositorySpy } from '../mocks'
import { DbAddPartner } from '@/data/usecases'
import { AddPartnerParams } from '@/domain/usecases'

const partnerData: AddPartnerParams = {
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

type SutTypes = {
  sut: DbAddPartner
  addPartnerRepositorySpy: AddPartnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPartnerRepositorySpy = new AddPartnerRepositorySpy()
  const sut = new DbAddPartner(addPartnerRepositorySpy)

  return {
    sut,
    addPartnerRepositorySpy
  }
}

describe('DbAddPartner Usecase', () => {
  it('Should call AddPartnerRepository with correct values', async () => {
    const { sut, addPartnerRepositorySpy } = makeSut()
    await sut.add(partnerData)
    expect(addPartnerRepositorySpy.params).toEqual(partnerData)
  })

  test('Should throw if AddPartnerRepository throws', async () => {
    const { sut, addPartnerRepositorySpy } = makeSut()
    jest.spyOn(addPartnerRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(partnerData)
    await expect(promise).rejects.toThrow()
  })
})
