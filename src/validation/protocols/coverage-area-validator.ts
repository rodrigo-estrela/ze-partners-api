import { CoverageArea } from '@/domain/models'

export interface CoverageAreaValidator {
  isValid: (data: CoverageArea) => boolean
}
