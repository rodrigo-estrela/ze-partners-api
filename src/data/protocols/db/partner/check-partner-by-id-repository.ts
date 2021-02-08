export interface CheckPartnerByIdRepository {
  checkById: (id: string) => Promise<CheckPartnerByIdRepository.Result>
}

export namespace CheckPartnerByIdRepository {
  export type Result = boolean
}
