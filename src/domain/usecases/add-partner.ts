import { PartnerModel } from '../models'

export interface AddPartner {
  add: (data: AddPartnerParams) => Promise<PartnerModel>
}

export type AddPartnerParams = Omit<PartnerModel, 'id'>
