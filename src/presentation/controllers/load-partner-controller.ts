import { CheckPartnerById } from '@/domain/usecases'
import { HttpRequest, HttpResponse } from '../helpers'
import { Controller } from '../protocols'

export class LoadPartnerController implements Controller {
  constructor (private readonly checkPartnerById: CheckPartnerById) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    await this.checkPartnerById.checkById(request.body.id)
    return null
  }
}
