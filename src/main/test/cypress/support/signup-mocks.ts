import faker from 'faker'
import * as Helper from './http-mocks'

export const mockInUseEmailError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, 'POST')
export const mockInvalidData = (): void => Helper.mockOK(/signup/, 'POST', { invalid: faker.random.words() })
export const mockOK = (): void => Helper.mockOK(/signup/, 'POST', { accessToken: faker.random.words(), name: faker.name.findName() })
