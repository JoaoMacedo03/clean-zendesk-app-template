import { IFieldValidation } from '@/validation/contracts/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidation implements IFieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (input: object): Error {
    return input[this.field]?.length < this.minLength ? new InvalidFieldError() : null
  }
}
