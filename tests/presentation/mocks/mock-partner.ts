import { AddPartner, LoadPartnerById, SearchNearestPartner } from '@/domain/usecases'
import { PartnerModel } from '@/domain/models'
import { mockPartnerModel } from '@/tests/domain/mock-partner-model'

export class AddPartnerSpy implements AddPartner {
  params: AddPartner.Params

  async add (params: AddPartner.Params): Promise<PartnerModel> {
    this.params = params
    return Object.assign({}, { id: 'any_id' }, params)
  }
}

export class LoadPartnerByIdSpy implements LoadPartnerById {
  partnerId: string
  result = mockPartnerModel()

  async loadById (partnerId: string): Promise<PartnerModel> {
    this.partnerId = partnerId
    return this.result
  }
}

export class SearchNearestPartnerSpy implements SearchNearestPartner {
  params: string
  result = mockPartnerModel()

  async search (location: any): Promise<PartnerModel> {
    this.params = location
    return this.result
  }
}
