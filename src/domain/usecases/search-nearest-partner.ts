import { PartnerModel } from '../models'

export interface SearchNearestPartner {
  search: (location: any) => Promise<PartnerModel>
}
