import { CoverageAreaValidator } from '@/validation/protocols'
import { CoverageArea } from '@/domain/models'

export class CoverageAreaValidatorSpy implements CoverageAreaValidator {
  isCoverageAreaValid = true
  data: CoverageArea

  isValid (data: CoverageArea): boolean {
    this.data = data
    return this.isCoverageAreaValid
  }
}
