import { AddPartnerRepository } from '@/data/protocols/db/partner'
import { PartnerModel } from '@/domain/models'
import { AddPartnerParams } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb'

export class PartnerMongoRepository implements AddPartnerRepository {
  async add (data: AddPartnerParams): Promise<PartnerModel> {
    const partnerCollection = await MongoHelper.getCollection('partners')
    const result = await partnerCollection.insertOne(data)
    return result.ops[0]
  }
}
