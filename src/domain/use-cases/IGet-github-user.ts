import { GitHubUserModel } from '@/domain/models'

export interface IGetGithubUser {
    get(githubUser: string): Promise<GitHubUserModel>
}
