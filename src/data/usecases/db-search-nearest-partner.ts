import { PartnerModel } from '@/domain/models'
import { SearchNearestPartner } from '@/domain/usecases'
import { SearchNearestPartnerRepository } from '../protocols/db/partner'

export class DbSearchNearestPartner implements SearchNearestPartner {
  constructor (private readonly searchNearestPartnerRepository: SearchNearestPartnerRepository) { }

  async search (location: any): Promise<PartnerModel> {
    return await this.searchNearestPartnerRepository.search(location)
  }
}
