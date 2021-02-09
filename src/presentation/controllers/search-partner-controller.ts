import { SearchNearestPartner } from '@/domain/usecases'
import { badRequest, HttpResponse } from '../helpers'
import { Controller, Validation } from '../protocols'

export class SearchPartnerController implements Controller {
  constructor (private readonly validation: Validation, private readonly searchNearestPartner: SearchNearestPartner) { }

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) return badRequest(error)

    const partner = await this.searchNearestPartner.search(request)
    return null
  }
}

export namespace SearchPartnerController {
  export type Request = {
    lon: any
    lat: any
  }
}
