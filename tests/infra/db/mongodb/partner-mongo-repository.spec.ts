import { MongoHelper, PartnerMongoRepository } from '@/infra/db/mongodb'
import { AddPartnerParams } from '@/domain/usecases'

import { Collection } from 'mongodb'

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
      expect(partner).toHaveProperty('_id')
    })
  })
})
