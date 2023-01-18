export class MinLengthFieldError extends Error {
    constructor (minLength: number) {
      super(`Informe pelo menos ${minLength} caracteres`)
    }
  }
