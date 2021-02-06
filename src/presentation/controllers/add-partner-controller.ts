import { Validation, Controller } from '../protocols'
import { HttpRequest, HttpResponse } from '../helpers'
import { AddPartner } from '@/domain/usecases'

export class AddPartnerController implements Controller {
  constructor (private readonly validation: Validation, private readonly addPartner: AddPartner) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return {
          statusCode: 400,
          body: 'Invalid Param'
        }
      }

      await this.addPartner.add(request.body)
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
