import { IValidation } from '@/presentation/contracts/validation'
import { IFieldValidation } from '@/validation/contracts/field-validation'

export class ValidationComposite implements IValidation {
  private constructor (private readonly validators: IFieldValidation[]) {}

  static build (validators: IFieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, input: object): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(input)
      if (error) return error.message
    }
  }
}
