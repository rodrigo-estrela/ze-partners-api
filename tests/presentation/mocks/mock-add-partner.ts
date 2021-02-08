import { AddPartnerParams, AddPartner, CheckPartnerById, LoadPartnerById } from '@/domain/usecases'
import { PartnerModel } from '@/domain/models'
import { mockPartnerModel } from '@/tests/domain/mock-partner-model'

export class AddPartnerSpy implements AddPartner {
  params: AddPartnerParams

  async add (params: AddPartnerParams): Promise<PartnerModel> {
    this.params = params
    return Object.assign({}, { id: 'any_id' }, params)
  }
}

export class CheckPartnerByIdSpy implements CheckPartnerById {
  partnerId: string
  result: boolean = true

  async checkById (partnerId: string): Promise<boolean> {
    this.partnerId = partnerId
    return this.result
  }
}

export class LoadPartnerByIdSpy implements LoadPartnerById {
  partnerId: string
  result = mockPartnerModel()

  async load (partnerId: string): Promise<PartnerModel> {
    this.partnerId = partnerId
    return this.result
  }
}
