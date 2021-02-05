import { Validation } from '../protocols'
import { HttpRequest, HttpResponse } from '../helpers'
import { AddPartner } from '@/domain/usecases'

export class AddPartnerController {
  constructor (private readonly validation: Validation, private readonly addPartner: AddPartner) { }

  handle (request: HttpRequest): HttpResponse {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return {
          statusCode: 400,
          body: 'Invalid Param'
        }
      }
      this.addPartner.add(request.body)
      return {
        statusCode: 204,
        body: 'No Body'
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal Server Error'
      }
    }
  }
}
