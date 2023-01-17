import { ZendeskHttpClient } from '@/infra/http'

export const makeZendeskHttpClient = (): ZendeskHttpClient => {
  return new ZendeskHttpClient()
}
