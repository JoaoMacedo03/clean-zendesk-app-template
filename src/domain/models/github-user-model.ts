type GitHubUserRepositoriesModel = {
    description: string
    name: string
    language: string
}

export type GitHubUserModel = {
    avatar_url: string
  location: string
  repos_url: string
  name: string
  bio: string
  followers: number
  following: number
  repositories: GitHubUserRepositoriesModel[]
}
