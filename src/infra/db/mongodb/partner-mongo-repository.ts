import { AddPartnerRepository, CheckPartnerByDocumentRepository, SearchNearestPartnerRepository } from '@/data/protocols/db/partner'
import { PartnerModel } from '@/domain/models'
import { AddPartnerParams, LoadPartnerById } from '@/domain/usecases'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../mongodb'

export class PartnerMongoRepository implements
  AddPartnerRepository,
  CheckPartnerByDocumentRepository,
  LoadPartnerById,
  SearchNearestPartnerRepository {
  async add (data: AddPartnerParams): Promise<PartnerModel> {
    const partnerCollection = await MongoHelper.getCollection('partners')
    const result = await partnerCollection.insertOne(data)
    if (!result.ops[0]) return null
    return MongoHelper.map(result.ops[0])
  }

  async checkByDocument (document: string): Promise<boolean> {
    const partnerCollection = await MongoHelper.getCollection('partners')
    const partner = await partnerCollection.findOne({
      document
    }, {
      projection: {
        _id: 1
      }
    })
    return partner !== null
  }

  async loadById (partnerId: string): Promise<PartnerModel> {
    const partnerCollection = await MongoHelper.getCollection('partners')
    const partner = await partnerCollection.findOne({ _id: new ObjectId(partnerId) })
    if (!partner) return null
    return MongoHelper.map(partner)
  }

  async search (location: any): Promise<PartnerModel> {
    const { lon, lat } = location
    const partnerCollection = await MongoHelper.getCollection('partners')
    const result = await partnerCollection.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [30, 20] },
        distanceField: 'dis.calculated',
        key: 'address',
        query: {
          coverageArea: {
            $geoIntersects: {
              $geometry: { type: 'Point', coordinates: [lon, lat] }
            }
          }
        }
      }

    }]).toArray()

    if (!result[0]) return null

    return MongoHelper.map(result[0])
  }
}
