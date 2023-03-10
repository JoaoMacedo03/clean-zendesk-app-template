import { IFieldValidation } from '@/validation/contracts/field-validation'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements IFieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
