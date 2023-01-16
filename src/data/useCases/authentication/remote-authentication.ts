import { IAuthentication } from '@/domain/useCases'
import { IHttpClient, HttpStatusCode } from '@/data/contracts/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteAuthentication.Model>
  ) {}

  async auth (params: IAuthentication.Params): Promise<IAuthentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = IAuthentication.Model
}
