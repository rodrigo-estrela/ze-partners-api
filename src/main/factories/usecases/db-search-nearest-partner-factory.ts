import { DbSearchNearestPartner } from '@/data/usecases'
import { PartnerMongoRepository } from '@/infra/db/mongodb'

export const makeDbSearchNearestPartner = (): DbSearchNearestPartner => {
  const partnerMongoRepository = new PartnerMongoRepository()
  const dbLoadPartnerById = new DbSearchNearestPartner(partnerMongoRepository)

  return dbLoadPartnerById
}
