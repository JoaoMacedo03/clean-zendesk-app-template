import { GitHubUserModel } from '../models'

export interface IGetGithubUserData {
    get(githubUser: string): Promise<GitHubUserModel>
}
