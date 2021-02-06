import geojsonValidation from 'geojson-validation'

import { AddressValidator } from '@/validation/protocols'
import { Address } from '@/domain/models'

export class AddressValidatorAdapter implements AddressValidator {
  isValid (data: Address): boolean {
    return geojsonValidation.isPoint(data)
  }
}
