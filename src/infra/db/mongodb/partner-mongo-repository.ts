import { AddPartnerRepository, CheckPartnerByDocumentRepository } from '@/data/protocols/db/partner'
import { PartnerModel } from '@/domain/models'
import { AddPartnerParams, LoadPartnerById } from '@/domain/usecases'
import { MongoHelper } from '../mongodb'

export class PartnerMongoRepository implements AddPartnerRepository, CheckPartnerByDocumentRepository, LoadPartnerById {
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
    const partner = await partnerCollection.findOne({ _id: partnerId })
    if (!partner) return null
    return MongoHelper.map(partner)
  }
}
