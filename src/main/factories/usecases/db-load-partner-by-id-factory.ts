import { DbLoadPartnerById } from '@/data/usecases'
import { PartnerMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadPartnerById = (): DbLoadPartnerById => {
  const partnerMongoRepository = new PartnerMongoRepository()
  const dbLoadPartnerById = new DbLoadPartnerById(partnerMongoRepository)

  return dbLoadPartnerById
}
