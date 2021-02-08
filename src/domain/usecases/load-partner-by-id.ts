import { PartnerModel } from '../models'

export interface LoadPartnerById {
  load: (partnerId: string) => Promise<PartnerModel>
}

export namespace LoadPartnerById {
  export type Result = PartnerModel
}
