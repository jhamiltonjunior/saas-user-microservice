export interface IHttpResponse {
  statusCode: number
  body: any
  redirect?: any
  // token?: string
}

export interface IHttpRequest {
  body?: any
  params?: string | any
  headers?: any
}
