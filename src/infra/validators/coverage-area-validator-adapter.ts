import geojsonValidation from 'geojson-validation'

import { CoverageAreaValidator } from '@/validation/protocols'
import { CoverageArea } from '@/domain/models'

export class CoverageAreaValidatorAdapter implements CoverageAreaValidator {
  isValid (data: CoverageArea): boolean {
    return geojsonValidation.isMultiPolygon(data)
  }
}
