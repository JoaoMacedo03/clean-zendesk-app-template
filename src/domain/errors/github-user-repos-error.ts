export class GithubUserReposError extends Error {
    constructor () {
      super('Não foi possível buscar os dados dos repositórios desse usuário no github')
      this.name = 'GithubUserReposError'
    }
  }
