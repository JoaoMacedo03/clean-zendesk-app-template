import {
  HttpResponse,
  HttpStatusCode,
  HttpRequest,
  IHttpClient
} from '@/data/contracts/http'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE'])
})

export class HttpClientSpy<R = any> implements IHttpClient<R> {
    url?: string
    method?: string
    body?: any
    headers?: any
    response: HttpResponse<R> = {
      statusCode: HttpStatusCode.success
    }

    async request (data: HttpRequest): Promise<HttpResponse<R>> {
      this.url = data.url
      this.method = data.method
      this.body = data.body
      this.headers = data.headers
      return this.response
    }
}
