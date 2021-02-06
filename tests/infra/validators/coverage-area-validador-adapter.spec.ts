import { CoverageAreaValidatorAdapter } from '@/infra/validators'

import geojsonValidation from 'geojson-validation'

jest.mock('geojson-validation', () => ({
  isMultiPolygon (): boolean {
    return true
  }
}))

const makeSut = (): CoverageAreaValidatorAdapter => {
  return new CoverageAreaValidatorAdapter()
}

describe('CoverageAreaValidatorAdapter', () => {
  it('Should return false if geojson-validation returns false', () => {
    const sut = makeSut()
    jest.spyOn(geojsonValidation, 'isMultiPolygon').mockReturnValueOnce(false)
    const isValid = sut.isValid({
      type: 'valid_type',
      coordinates: []
    })
    expect(isValid).toBe(false)
  })

  it('Should return true if geojson-validation return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid({
      type: 'valid_type',
      coordinates: []
    })
    expect(isValid).toBe(true)
  })
})
