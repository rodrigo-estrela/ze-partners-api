import { PartnerModel } from '../models'

export interface LoadPartnerById {
  load: (partnerId: string) => Promise<PartnerModel>
}
