import { PartnerModel } from '@/domain/models'
import { AddPartner } from './usecases'

export const mockPartnerModel = (): PartnerModel => ({
  id: 'any_id',
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001',
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741]
  }
})

export const mockAddPartnerParams = (): AddPartner.Params[] => {
  return [
    {
      tradingName: 'square_0',
      ownerName: 'owner_name_0',
      document: 'document_0',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [[[0, 0], [0, 4], [4, 4], [4, 0], [0, 0]]]
        ]
      },
      address: {
        type: 'Point',
        coordinates: [0, 0]
      }
    },
    {
      tradingName: 'square_1',
      ownerName: 'owner_name_1',
      document: 'document_1',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [[[0, 5], [0, 9], [4, 9], [4, 5], [0, 5]]]
        ]
      },
      address: {
        type: 'Point',
        coordinates: [0, 5]
      }
    }
  ]
}
