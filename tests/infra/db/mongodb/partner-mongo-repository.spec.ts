import { MongoHelper, PartnerMongoRepository } from '@/infra/db/mongodb'

import { Collection } from 'mongodb'

import FakeObjectId from 'bson-objectid'
import { mockAddPartnerParams } from '@/tests/domain/mock-partner-model'

let partnerCollection: Collection

const addPartnerParams = mockAddPartnerParams()[0]

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
    partnerCollection = await MongoHelper.getCollection('partners')
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

  describe('search()', () => {
    it('Should return null if none of the partners coverageArea intersects with provided location', async () => {
      const partners = mockAddPartnerParams()
      await partnerCollection.insertMany(partners)
      const sut = makeSut()
      const location = { lon: 2, lat: 10 }
      const foundPartner = await sut.search(location)
      expect(foundPartner).toBeFalsy()
    })

    it('Should return correct partner', async () => {
      const partners = mockAddPartnerParams()
      await partnerCollection.insertMany(partners)
      const sut = makeSut()
      const location = { lon: 2, lat: 2 }
      const foundPartner = await sut.search(location)
      expect(foundPartner.tradingName).toBe(partners[0].tradingName)
    })
  })
})
