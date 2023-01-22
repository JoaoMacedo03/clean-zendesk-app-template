import i18n from 'i18next'
export class MinLengthFieldError extends Error {
  constructor (minLength: number) {
    super(
      i18n.t('validation.errors.min-length-error-1') + minLength + i18n.t('validation.errors.min-length-error-2')
    )
  }
}
