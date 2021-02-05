import { CoverageAreaValidation } from '@/validation/validators'
import { CoverageAreaValidatorSpy } from '../mocks'

const fieldName = 'coverageArea'

const data = {
  type: 'valid_type',
  coordinates: 'valid_coordinates'
}

type SutTypes = {
  sut: CoverageAreaValidation
  coverageAreaValidatorSpy: CoverageAreaValidatorSpy
}

const makeSut = (): SutTypes => {
  const coverageAreaValidatorSpy = new CoverageAreaValidatorSpy()
  const sut = new CoverageAreaValidation(fieldName, coverageAreaValidatorSpy)

  return {
    sut,
    coverageAreaValidatorSpy
  }
}

describe('CoverageAreaValidation', () => {
  it('Should return an error if CoverageAreaValidator returns false', () => {
    const { sut, coverageAreaValidatorSpy } = makeSut()
    coverageAreaValidatorSpy.isCoverageAreaValid = false
    const error = sut.validate({ [fieldName]: 'valid_coverage_area' })
    expect(error).toEqual(new Error(`Invalid Param: ${fieldName}`))
  })
})
