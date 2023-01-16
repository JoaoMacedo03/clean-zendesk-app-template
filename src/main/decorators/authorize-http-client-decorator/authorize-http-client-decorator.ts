import { IGetStorage } from '@/data/contracts/cache'
import { HttpRequest, HttpResponse, IHttpClient } from '@/data/contracts/http'

export class AuthorizeHttpClientDecorator implements IHttpClient {
    constructor (
        private readonly getStorage: IGetStorage,
        private readonly httpGetClient: IHttpClient
    ) {}

    async request (data: HttpRequest): Promise<HttpResponse> {
        const account = this.getStorage.get('account')
        if (account?.accessToken) {
            data.headers = { ...data.headers, 'x-access-token': account.accessToken }
        }
        const httpResponse = await this.httpGetClient.request(data)
        return httpResponse
    }
}
