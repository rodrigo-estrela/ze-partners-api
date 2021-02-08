import { CheckPartnerById } from '@/domain/usecases'
import { InvalidParamError } from '../errors'
import { forbidden, HttpResponse } from '../helpers'
import { Controller } from '../protocols'

export class LoadPartnerController implements Controller {
  constructor (private readonly checkPartnerById: CheckPartnerById) { }

  async handle (request: LoadPartnerController.Request): Promise<HttpResponse> {
    const exists = await this.checkPartnerById.checkById(request.partnerId)
    if (!exists) return forbidden(new InvalidParamError('partnerId'))

    return null
  }
}

export namespace LoadPartnerController {
  export type Request = {
    partnerId: string
  }
}
