import { DbAddPartner } from '@/data/usecases'
import { PartnerMongoRepository } from '@/infra/db'

export const makeDbAddPartner = (): DbAddPartner => {
  const partnerMongoRepository = new PartnerMongoRepository()
  const dbAddPartner = new DbAddPartner(partnerMongoRepository, partnerMongoRepository)
  return dbAddPartner
}
