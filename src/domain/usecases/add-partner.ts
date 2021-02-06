import { PartnerModel } from '../models'

export interface AddPartner {
  add: (data: AddPartnerParams) => PartnerModel
}

export type AddPartnerParams = Omit<PartnerModel, 'id'>
