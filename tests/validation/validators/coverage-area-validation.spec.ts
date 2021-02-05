import { CoverageAreaValidation } from '@/validation/validators'
import { CoverageAreaValidatorSpy } from '../mocks'

const fieldName = 'coverageArea'

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

  it('Should all CoverageAreaValidator with correct data', () => {
    const { sut, coverageAreaValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(coverageAreaValidatorSpy, 'isValid')
    sut.validate('valid_coverage_area')
    expect(isValidSpy).toHaveBeenCalledWith('valid_coverage_area')
  })

  it('Should throw if CoverageAreaValidator throws', () => {
    const { sut, coverageAreaValidatorSpy } = makeSut()
    jest.spyOn(coverageAreaValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
