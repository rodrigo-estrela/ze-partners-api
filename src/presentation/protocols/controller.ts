import { HttpRequest, HttpResponse } from '../helpers'

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}
