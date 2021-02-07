import { PartnerModel } from '../models'

export interface AddPartner {
  add: (data: AddPartnerParams) => Promise<PartnerModel> | undefined
}

export type AddPartnerParams = Omit<PartnerModel, 'id'>
