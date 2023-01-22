import i18n from 'i18next'

export class GithubUserReposError extends Error {
  constructor () {
    super(i18n.t('domain.errors.github-user-repos-error'))
    this.name = 'GithubUserReposError'
  }
}
