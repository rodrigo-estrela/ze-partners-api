export class TypeParamError extends Error {
  constructor (paramName: string, paramType: string) {
    super(`Param ${paramName} must be a ${paramType}`)
    this.name = 'InvalidParamError'
  }
}
