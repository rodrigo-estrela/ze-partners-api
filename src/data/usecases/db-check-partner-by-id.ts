import { CheckPartnerById } from '@/domain/usecases'
import { CheckPartnerByIdRepository } from '@/data/protocols/db/partner'

export class DbCheckPartnerById implements CheckPartnerById {
  constructor (private readonly checkPartnerByIdRepository: CheckPartnerByIdRepository) { }

  async checkById (id: string): Promise<CheckPartnerById.Result> {
    return this.checkPartnerByIdRepository.checkById(id)
  }
}
