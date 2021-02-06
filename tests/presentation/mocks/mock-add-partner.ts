import { AddPartnerParams, AddPartner } from '@/domain/usecases'
import { PartnerModel } from '@/domain/models'

export class AddPartnerSpy implements AddPartner {
  params: AddPartnerParams

  add (params: AddPartnerParams): PartnerModel {
    this.params = params
    return Object.assign({}, { id: 'any_id' }, params)
  }
}
