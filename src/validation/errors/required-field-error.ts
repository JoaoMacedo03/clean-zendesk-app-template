import i18n from 'i18next'

export class RequiredFieldError extends Error {
  constructor () {
    super(i18n.t('validation.errors.required-field-error'))
    this.name = 'RequiredFieldError'
  }
}
