import { HttpStatusCode, IHttpClient } from '@/data/contracts/http'
import { GithubUserError } from '@/domain/errors'
import { GitHubUserModel } from '@/domain/models'
import { IGetGithubUser } from '@/domain/use-cases'

export class GetGithubUserData implements IGetGithubUser {
    constructor (
        private readonly url: string,
        private readonly httpClient: IHttpClient<GitHubUserModel>
      ) {}

    async get (githubUser: string): Promise<GitHubUserModel> {
        const httpResponse = await this.httpClient.request({
            url: `${this.url}/${githubUser}`,
            method: 'GET'
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.success: return httpResponse.body
            default: throw new GithubUserError()
        }
    }
}
