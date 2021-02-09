import { SearchNearestPartner } from '@/domain/usecases'
import { badRequest, HttpResponse, noContent, ok, serverError } from '../helpers'
import { Controller, Validation } from '../protocols'

export class SearchPartnerController implements Controller {
  constructor (private readonly validation: Validation, private readonly searchNearestPartner: SearchNearestPartner) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const partner = await this.searchNearestPartner.search(request)
      if (!partner) return noContent()

      return ok(partner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SearchPartnerController {
  export type Request = {
    lon: any
    lat: any
  }
}
