import { Validation, Controller } from '../protocols'
import { HttpResponse, serverError, ok, badRequest, forbidden } from '../helpers'
import { AddPartner } from '@/domain/usecases'
import { DocumentInUseError } from '../errors'
import { PartnerModel } from '@/domain/models'

export class AddPartnerController implements Controller {
  constructor (private readonly validation: Validation, private readonly addPartner: AddPartner) { }

  async handle (request: AddPartnerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const partner = await this.addPartner.add(request)
      if (!partner) {
        return forbidden(new DocumentInUseError())
      }

      return ok(partner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPartnerController {
  export type Request = Omit<PartnerModel, 'id'>
}
