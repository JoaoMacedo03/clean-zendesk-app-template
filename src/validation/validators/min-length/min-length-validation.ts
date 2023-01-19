import { IFieldValidation } from '@/validation/contracts/field-validation'
import { MinLengthFieldError } from '@/validation/errors/min-length-error'

export class MinLengthValidation implements IFieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (input: object): Error {
    return input[this.field]?.length < this.minLength ? new MinLengthFieldError(this.minLength) : null
  }
}
