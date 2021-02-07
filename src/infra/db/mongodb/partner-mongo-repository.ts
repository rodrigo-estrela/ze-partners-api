import { AddPartnerRepository, CheckPartnerByDocumentRepository } from '@/data/protocols/db/partner'
import { PartnerModel } from '@/domain/models'
import { AddPartnerParams } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb'

export class PartnerMongoRepository implements AddPartnerRepository, CheckPartnerByDocumentRepository {
  async add (data: AddPartnerParams): Promise<PartnerModel> {
    const partnerCollection = await MongoHelper.getCollection('partners')
    const result = await partnerCollection.insertOne(data)
    return result.ops[0]
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
}
