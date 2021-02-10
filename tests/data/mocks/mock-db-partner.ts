import { AddPartner } from '@/domain/usecases'
import { AddPartnerRepository, CheckPartnerByDocumentRepository, LoadPartnerByIdRepository, SearchNearestPartnerRepository } from '@/data/protocols/db/partner'
import { PartnerModel } from '@/domain/models'
import { mockPartnerModel } from '@/tests/domain/mock-partner-model'

export class AddPartnerRepositorySpy implements AddPartnerRepository {
  params: AddPartner.Params

  async add (params: AddPartner.Params): Promise<PartnerModel> {
    this.params = params
    return Object.assign({}, { id: 'any_id' }, params)
  }
}

export class CheckPartnerByDocumentRepositorySpy implements CheckPartnerByDocumentRepository {
  email: string
  result = false

  async checkByDocument (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class LoadPartnerByIdRepositorySpy implements LoadPartnerByIdRepository {
  id: string
  result = mockPartnerModel()

  async loadById (id: string): Promise<LoadPartnerByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class SearchNearestPartnerRepositorySpy implements SearchNearestPartnerRepository {
  params: any
  result = mockPartnerModel()

  async search (location: any): Promise<SearchNearestPartnerRepository.Result> {
    this.params = location
    return this.result
  }
}
