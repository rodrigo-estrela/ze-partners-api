import { Validation } from '../protocols'
import { HttpRequest, HttpResponse } from '../helpers'

export class AddPartnerController {
  constructor (private readonly validation: Validation) { }

  handle (request: HttpRequest): HttpResponse {
    this.validation.validate(request)
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
