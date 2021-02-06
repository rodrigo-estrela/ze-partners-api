import { ServerError } from '../errors'

export type HttpRequest = {
  body?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
