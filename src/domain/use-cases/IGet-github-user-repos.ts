import { GitHubUserReposModel } from '@/domain/models'

export interface IGetGithubUserRepos {
    get(githubUser: string): Promise<GitHubUserReposModel>
}
