import i18n from 'i18next'

export class GithubUserError extends Error {
  constructor () {
    super(i18n.t('domain.errors.github-user-error'))
    this.name = 'GithubUserError'
  }
}
