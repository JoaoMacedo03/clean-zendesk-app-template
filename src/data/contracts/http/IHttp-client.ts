export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export enum HttpStatusCode {
    unauthorized = 401,
    noContent = 204,
    badRequest = 400,
    success = 200,
    notFound = 404,
    forbidden = 403,
    serverError = 500
}

export type HttpResponse<T = any> = {
statusCode: HttpStatusCode
body?: T
}

export interface IHttpClient<R = any> {
    request(data: HttpRequest): Promise<HttpResponse<R>>
}
