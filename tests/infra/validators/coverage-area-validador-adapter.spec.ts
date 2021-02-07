import { CoverageAreaValidatorAdapter } from '../../../src/infra/validators'

import geojsonValidation from 'geojson-validation'

jest.mock('geojson-validation', () => ({
  isMultiPolygon (): boolean {
    return true
  }
}))

const data = {
  type: 'valid_type',
  coordinates: []
}

const makeSut = (): CoverageAreaValidatorAdapter => {
  return new CoverageAreaValidatorAdapter()
}

describe('CoverageAreaValidatorAdapter', () => {
  it('Should return false if geojson-validation returns false', () => {
    const sut = makeSut()
    jest.spyOn(geojsonValidation, 'isMultiPolygon').mockReturnValueOnce(false)
    const isValid = sut.isValid(data)
    expect(isValid).toBe(false)
  })

  it('Should return true if geojson-validation return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(data)
    expect(isValid).toBe(true)
  })

  it('Should call geojson-validation with correct data', () => {
    const sut = makeSut()
    const isMultiPolygonSpy = jest.spyOn(geojsonValidation, 'isMultiPolygon')
    sut.isValid(data)
    expect(isMultiPolygonSpy).toHaveBeenCalledWith(data)
  })
})
