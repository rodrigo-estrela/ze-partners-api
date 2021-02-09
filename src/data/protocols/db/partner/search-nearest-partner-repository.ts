import { PartnerModel } from '@/domain/models'

export interface SearchNearestPartnerRepository {
  search: (location: any) => Promise<SearchNearestPartnerRepository.Result>
}

export namespace SearchNearestPartnerRepository {
  export type Result = PartnerModel
}
