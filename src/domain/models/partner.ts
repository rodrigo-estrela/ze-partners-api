export type PartnerModel = {
  id: string
  tradingName: string
  ownerName: string
  document: string
  coverageArea: CoverageArea
  address: Address
}

export type CoverageArea = {
  type: string
  coordinates: number[][][]
}

export type Address = {
  type: string
  coordinates: number[]
}
