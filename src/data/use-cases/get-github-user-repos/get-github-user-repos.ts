import { HttpStatusCode, IHttpClient } from '@/data/contracts/http'
import { GithubUserReposError } from '@/domain/errors'
import { GitHubUserReposModel } from '@/domain/models'
import { IGetGithubUserRepos } from '@/domain/use-cases'

export class GetGithubUserRepos implements IGetGithubUserRepos {
    constructor (
        private readonly httpClient: IHttpClient<GitHubUserReposModel[]>
      ) {}

    async get (githubUserRepoUrl: string): Promise<GitHubUserReposModel[]> {
        const httpResponse = await this.httpClient.request({
            url: githubUserRepoUrl,
            method: 'GET'
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.success: return httpResponse.body
            default: throw new GithubUserReposError()
        }
    }
}
