import { AddPartnerParams } from '@/domain/usecases'
import { PartnerModel } from '@/domain/models'

export interface AddPartnerRepository {
  add: (data: AddPartnerParams) => Promise<PartnerModel>
}
