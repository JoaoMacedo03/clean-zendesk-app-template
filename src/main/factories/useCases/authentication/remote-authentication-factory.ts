import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication'
import { IAuthentication } from '@/domain/useCases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAuthentication = (): IAuthentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
