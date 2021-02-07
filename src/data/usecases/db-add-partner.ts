import { PartnerModel } from '@/domain/models'
import { AddPartner, AddPartnerParams } from '@/domain/usecases'
import { AddPartnerRepository, CheckPartnerByDocumentRepository } from '../protocols/db/partner'

export class DbAddPartner implements AddPartner {
  constructor (private readonly addPartnerRepository: AddPartnerRepository, private readonly checkPartnerByDocumentRepository: CheckPartnerByDocumentRepository) { }

  async add (data: AddPartnerParams): Promise<PartnerModel> | undefined {
    const exists = await this.checkPartnerByDocumentRepository.checkByDocument(data.document)
    if (exists) return undefined

    const partner = await this.addPartnerRepository.add(data)
    return partner
  }
}
