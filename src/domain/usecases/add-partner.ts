import { PartnerModel } from '../models'

export interface AddPartner {
  add: (data: AddPartnerParams) => void
}

export type AddPartnerParams = Omit<PartnerModel, 'id'>
