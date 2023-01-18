import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/builder-validation'

export const makeSidebarValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('githubuser').required().min(3).build()
  ])
}
