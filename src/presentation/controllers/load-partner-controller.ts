import { CheckPartnerById } from '@/domain/usecases'
import { HttpResponse } from '../helpers'
import { Controller } from '../protocols'

export class LoadPartnerController implements Controller {
  constructor (private readonly checkPartnerById: CheckPartnerById) { }

  async handle (request: LoadPartnerController.Request): Promise<HttpResponse> {
    await this.checkPartnerById.checkById(request.partnerId)
    return null
  }
}

export namespace LoadPartnerController {
  export type Request = {
    partnerId: string
  }
}
