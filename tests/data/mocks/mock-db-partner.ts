import { AddPartnerParams } from '@/domain/usecases'
import { AddPartnerRepository, CheckPartnerByDocumentRepository } from '@/data/protocols/db/partner'
import { PartnerModel } from '@/domain/models'

export class AddPartnerRepositorySpy implements AddPartnerRepository {
  params: AddPartnerParams

  async add (params: AddPartnerParams): Promise<PartnerModel> {
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
