import { LoadPartnerById } from '@/domain/usecases'
import { LoadPartnerByIdRepository } from '@/data/protocols/db/partner'

export class DbLoadPartnerById implements LoadPartnerById {
  constructor (private readonly loadPartnerByIdRepository: LoadPartnerByIdRepository) { }

  async loadById (partnerId: string): Promise<LoadPartnerById.Result> {
    return await this.loadPartnerByIdRepository.loadById(partnerId)
  }
}
