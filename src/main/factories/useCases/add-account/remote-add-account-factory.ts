import { RemoteAddAccount } from '@/data/useCases/add-account/remote-add-account'
import { IAddAccount } from '@/domain/useCases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAddAccount = (): IAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
