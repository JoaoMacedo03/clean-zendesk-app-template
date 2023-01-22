import i18n from 'i18next'
export class UnexpectedError extends Error {
  constructor () {
    super(i18n.t('domain.errors.unexpected-error'))
    this.name = 'UnexpectedError'
  }
}
