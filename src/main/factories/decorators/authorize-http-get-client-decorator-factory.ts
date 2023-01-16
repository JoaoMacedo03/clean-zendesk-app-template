import { IHttpClient } from '@/data/contracts/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeAuthorizeHttpClientDecorator = (): IHttpClient => {
    return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
