import { CheckPartnerById, LoadPartnerById } from '@/domain/usecases'
import { InvalidParamError } from '../errors'
import { forbidden, HttpResponse, ok, serverError } from '../helpers'
import { Controller } from '../protocols'

export class LoadPartnerController implements Controller {
  constructor (private readonly checkPartnerById: CheckPartnerById, private readonly loadPartnerById: LoadPartnerById) { }

  async handle (request: LoadPartnerController.Request): Promise<HttpResponse> {
    try {
      const exists = await this.checkPartnerById.checkById(request.partnerId)
      if (!exists) return forbidden(new InvalidParamError('partnerId'))

      const partner = await this.loadPartnerById.load(request.partnerId)
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
