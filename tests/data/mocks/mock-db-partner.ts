import { AddPartnerParams } from '@/domain/usecases'
import { AddPartnerRepository } from '../protocols/db/partner'
import { PartnerModel } from '@/domain/models'

export class AddPartnerRepositorySpy implements AddPartnerRepository {
  params: AddPartnerParams

  async add (params: AddPartnerParams): Promise<PartnerModel> {
    this.params = params
    return Object.assign({}, { id: 'any_id' }, params)
  }
}
