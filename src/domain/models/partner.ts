export type PartnerModel = {
  id: string
  tradingName: string
  owerName: string
  document: string
  coverageArea: CoverageArea
  address: Address
}

type CoverageArea = {
  type: string
  coordinates: []
}

type Address = {
  type: string
  coordinates: []
}
