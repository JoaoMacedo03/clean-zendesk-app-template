import { GitHubUserModel, GitHubUserReposModel } from "@/domain/models"

type GithubUserData = {
    user: GitHubUserModel
    repositories: GitHubUserReposModel[]
}

export type SidebarState = {
    githubUser: string
    error: string
    userFound: boolean
    githubUserData: GithubUserData
}