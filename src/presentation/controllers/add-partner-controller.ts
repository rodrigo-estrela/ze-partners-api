import { Validation } from '../protocols'
import { HttpRequest, HttpResponse } from '../helpers'

export class AddPartnerController {
  constructor (private readonly validation: Validation) { }

  handle (request: HttpRequest): HttpResponse {
    const error = this.validation.validate(request)
    if (error) {
      return {
        statusCode: 400,
        body: 'Invalid Param'
      }
    }
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
