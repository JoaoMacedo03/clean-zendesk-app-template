import { GetGithubUserRepos } from '@/data/use-cases'
import { IGetGithubUserRepos } from '@/domain/use-cases'
import { makeZendeskHttpClient } from '@/main/factories/http'

export const makeGetGithubUserRepos = (): IGetGithubUserRepos => {
  return new GetGithubUserRepos(makeZendeskHttpClient())
}
