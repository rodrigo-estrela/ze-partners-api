import { LoadPartnerById } from '@/domain/usecases'
import { InvalidParamError } from '../errors'
import { forbidden, HttpResponse, ok, serverError } from '../helpers'
import { Controller } from '../protocols'

export class LoadPartnerController implements Controller {
  constructor (private readonly loadPartnerById: LoadPartnerById) { }

  async handle (request: LoadPartnerController.Request): Promise<HttpResponse> {
    try {
      const partner = await this.loadPartnerById.loadById(request.partnerId)
      if (!partner) return forbidden(new InvalidParamError('partnerId'))

      return ok(partner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPartnerController {
  export type Request = {
    partnerId: string
  }
}
