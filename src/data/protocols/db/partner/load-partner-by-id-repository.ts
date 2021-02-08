import { PartnerModel } from '@/domain/models'

export interface LoadPartnerByIdRepository {
  loadById: (id: string) => Promise<LoadPartnerByIdRepository.Result>
}

export namespace LoadPartnerByIdRepository {
  export type Result = PartnerModel
}
