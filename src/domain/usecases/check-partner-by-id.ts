export interface CheckPartnerById {
  checkById: (partnerId: string) => Promise<boolean>
}
