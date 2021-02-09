import { PartnerModel } from '@/domain/models'

export interface SearchNearestPartnerRepository {
  search: (id: string) => Promise<SearchNearestPartnerRepository.Result>
}

export namespace SearchNearestPartnerRepository {
  export type Result = PartnerModel
}
