export interface CheckPartnerById {
  checkById: (partnerId: string) => Promise<boolean>
}

export namespace CheckPartnerById {
  export type Result = boolean
}
