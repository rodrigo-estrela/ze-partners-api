import { AddPartner } from '@/domain/usecases'
import { PartnerModel } from '@/domain/models'

export interface AddPartnerRepository {
  add: (data: AddPartner.Params) => Promise<PartnerModel>
}
