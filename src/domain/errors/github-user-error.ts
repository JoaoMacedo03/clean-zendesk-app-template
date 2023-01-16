export class GithubUserError extends Error {
    constructor () {
      super('Não foi possível buscar os dados desse usuário no github')
      this.name = 'GithubUserError'
    }
  }
