import { ServerError } from '../errors/serverError'
import { IHttpResponse } from '../ports/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error.message,
  redirect: `${process.env.ADMIN}/login`
})

export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: data,
  redirect: `${process.env.ADMIN}`
  // token,
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
  // token,
})

export const serverError = (reason: string): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason),
})
