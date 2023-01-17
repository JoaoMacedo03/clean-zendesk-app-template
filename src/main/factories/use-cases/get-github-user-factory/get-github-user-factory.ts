import { GetGithubUser } from '@/data/use-cases'
import { IGetGithubUser } from '@/domain/use-cases'
import { makeApiUrl, makeZendeskHttpClient } from '@/main/factories/http'

export const makeGetGithubUser = (): IGetGithubUser => {
    return new GetGithubUser(makeApiUrl('/users'), makeZendeskHttpClient())
  }
