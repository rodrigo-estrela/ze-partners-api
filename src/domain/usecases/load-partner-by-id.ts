import { PartnerModel } from '../models'

export interface LoadPartnerById {
  loadById: (partnerId: string) => Promise<PartnerModel>
}

export namespace LoadPartnerById {
  export type Result = PartnerModel
}
