import { PartnerModel } from '../models'

export interface AddPartner {
  add: (data: AddPartner.Params) => Promise<PartnerModel> | undefined
}

export namespace AddPartner {
  export type Params = Omit<PartnerModel, 'id'>
}
