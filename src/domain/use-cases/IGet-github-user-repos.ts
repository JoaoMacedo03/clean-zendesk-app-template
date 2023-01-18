import { GitHubUserReposModel } from '@/domain/models'

export interface IGetGithubUserRepos {
    get(githubUserRepoUrl: string): Promise<GitHubUserReposModel[]>
}
