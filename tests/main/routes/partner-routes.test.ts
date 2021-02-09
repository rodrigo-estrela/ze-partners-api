import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'

import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let partnerCollection: Collection

const partnerData = {
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

describe('Partner Routes', () => {
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

  describe('POST /partners', () => {
    it('Should return an accoutn on success', async () => {
      await request(app)
        .post('/api/partners')
        .send(partnerData)
        .expect(200)
    })
  })

  describe('GET /partners/:partnerId', () => {
    it('Should return 403 if invalid partner id is provided', async () => {
      await request(app)
        .get(`/api/partners/${FakeObjectId.generate()}`)
        .expect(403)
    })

    it('Should return 200 if valid partner id is provided', async () => {
      let insertedId = ''
      await request(app)
        .post('/api/partners')
        .send(partnerData)
        .expect(200)
        .expect((res) => {
          insertedId = res.body.id
        })

      await request(app)
        .get(`/api/partners/${insertedId}`)
        .expect(200)
    })
  })
})
