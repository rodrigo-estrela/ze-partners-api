import { MongoHelper, PartnerMongoRepository } from '@/infra/db/mongodb'
import { AddPartnerParams } from '@/domain/usecases'

import { Collection } from 'mongodb'

import FakeObjectId from 'bson-objectid'

let partnerCollection: Collection

const addPartnerParams: AddPartnerParams = {
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001',
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741]
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
      const partners = [
        {
          tradingName: 'square_0',
          ownerName: 'owner_name_0',
          document: 'document_0',
          coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
              [[[0, 0], [0, 4], [4, 4], [4, 0], [0, 0]]]
            ]
          },
          address: {
            type: 'Point',
            coordinates: [0, 0]
          }
        },
        {
          tradingName: 'square_1',
          ownerName: 'owner_name_1',
          document: 'document_1',
          coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
              [[[0, 5], [0, 9], [4, 9], [4, 5], [0, 5]]]
            ]
          },
          address: {
            type: 'Point',
            coordinates: [0, 5]
          }
        }
      ]
      await partnerCollection.insertMany(partners)
      const sut = makeSut()
      const location = { lon: 2, lat: 10 }
      const foundPartner = await sut.search(location)
      expect(foundPartner).toBeFalsy()
    })

    it('Should return correct partner', async () => {
      const partners = [
        {
          tradingName: 'square_0',
          ownerName: 'owner_name_0',
          document: 'document_0',
          coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
              [[[0, 0], [0, 4], [4, 4], [4, 0], [0, 0]]]
            ]
          },
          address: {
            type: 'Point',
            coordinates: [0, 0]
          }
        },
        {
          tradingName: 'square_1',
          ownerName: 'owner_name_1',
          document: 'document_1',
          coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
              [[[0, 5], [0, 9], [4, 9], [4, 5], [0, 5]]]
            ]
          },
          address: {
            type: 'Point',
            coordinates: [0, 5]
          }
        }
      ]
      await partnerCollection.insertMany(partners)
      const sut = makeSut()
      const location = { lon: 2, lat: 2 }
      const foundPartner = await sut.search(location)
      expect(foundPartner.tradingName).toBe(partners[0].tradingName)
    })
  })
})
