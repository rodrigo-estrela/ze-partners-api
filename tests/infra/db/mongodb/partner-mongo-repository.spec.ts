import { MongoHelper, PartnerMongoRepository } from '@/infra/db/mongodb'
import { AddPartnerParams } from '@/domain/usecases'

import { Collection } from 'mongodb'

import FakeObjectId from 'bson-objectid'

let partnerCollection: Collection

const addPartnerParams: AddPartnerParams = {
  tradingName: 'any_trading_name',
  ownerName: 'any_owner_name',
  document: 'any_document',
  coverageArea: {
    type: 'any_type',
    coordinates: []
  },
  address: {
    type: 'any_type',
    coordinates: []
  }
}

const makeSut = (): PartnerMongoRepository => {
  return new PartnerMongoRepository()
}
describe('PartnerMongoRepositoy', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    partnerCollection = await MongoHelper.getCollection('accounts')
    await partnerCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return a partner on success', async () => {
      const sut = makeSut()
      const partner = await sut.add(addPartnerParams)
      expect(partner).toHaveProperty('id')
    })
  })

  describe('checkByDocument()', () => {
    it('Should return true if document is already in use', async () => {
      const sut = makeSut()
      await partnerCollection.insertOne(addPartnerParams)
      const exists = await sut.checkByDocument(addPartnerParams.document)
      expect(exists).toBe(true)
    })
  })

  describe('loadById()', () => {
    it('Should return a partner', async () => {
      const sut = makeSut()
      const { insertedId } = await partnerCollection.insertOne(addPartnerParams)
      const partner = await sut.loadById(insertedId)
      expect(partner).toBeTruthy()
      expect(partner.id).toEqual(insertedId)
    })

    it('Should return Falsy if partner does not exist', async () => {
      const sut = makeSut()
      const partner = await sut.loadById(FakeObjectId.generate())
      expect(partner).toBeFalsy()
    })
  })
})
