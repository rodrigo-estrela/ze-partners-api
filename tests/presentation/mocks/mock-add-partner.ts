import { AddPartnerParams, AddPartner, CheckPartnerById } from '@/domain/usecases'
import { PartnerModel } from '@/domain/models'

export class AddPartnerSpy implements AddPartner {
  params: AddPartnerParams

  async add (params: AddPartnerParams): Promise<PartnerModel> {
    this.params = params
    return Object.assign({}, { id: 'any_id' }, params)
  }
}

export class CheckPartnerByIdSpy implements CheckPartnerById {
  partnerId: string
  result: true

  async checkById (partnerId: string): Promise<boolean> {
    this.partnerId = partnerId
    return this.result
  }
}
