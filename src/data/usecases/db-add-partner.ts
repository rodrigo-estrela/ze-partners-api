import { PartnerModel } from '@/domain/models'
import { AddPartner, AddPartnerParams } from '@/domain/usecases'
import { AddPartnerRepository } from '../protocols/db/partner'

export class DbAddPartner implements AddPartner {
  constructor (private readonly addPartnerRepository: AddPartnerRepository) { }

  async add (data: AddPartnerParams): Promise<PartnerModel> {
    const partner = await this.addPartnerRepository.add(data)
    return partner
  }
}
