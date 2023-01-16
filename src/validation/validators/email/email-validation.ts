import { IFieldValidation } from '@/validation/contracts/field-validation'
import { InvalidFieldError } from '@/validation/errors'
export class EmailValidation implements IFieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): InvalidFieldError {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidFieldError()
  }
}
