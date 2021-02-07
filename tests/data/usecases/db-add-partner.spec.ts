import { AddPartnerRepositorySpy, CheckPartnerByDocumentRepositorySpy } from '../mocks'
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
  checkPartnerByDocumentRepositorySpy: CheckPartnerByDocumentRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPartnerRepositorySpy = new AddPartnerRepositorySpy()
  const checkPartnerByDocumentRepositorySpy = new CheckPartnerByDocumentRepositorySpy()
  const sut = new DbAddPartner(addPartnerRepositorySpy, checkPartnerByDocumentRepositorySpy)

  return {
    sut,
    addPartnerRepositorySpy,
    checkPartnerByDocumentRepositorySpy
  }
}

describe('DbAddPartner Usecase', () => {
  it('Should call AddPartnerRepository with correct values', async () => {
    const { sut, addPartnerRepositorySpy } = makeSut()
    await sut.add(partnerData)
    expect(addPartnerRepositorySpy.params).toEqual(partnerData)
  })

  it('Should throw if AddPartnerRepository throws', async () => {
    const { sut, addPartnerRepositorySpy } = makeSut()
    jest.spyOn(addPartnerRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(partnerData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return undefined if document is already in use', async () => {
    const { sut, checkPartnerByDocumentRepositorySpy } = makeSut()
    checkPartnerByDocumentRepositorySpy.result = true
    const partner = await sut.add(partnerData)
    expect(partner).toBeUndefined()
  })

  it('Should return partner data on success', async () => {
    const { sut } = makeSut()
    const partner = await sut.add(partnerData)
    expect(partner).toHaveProperty('id')
  })
})
