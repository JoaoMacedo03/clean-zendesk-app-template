import faker from 'faker'
import * as Helper from './http-mocks'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/, 'POST')
export const mockOK = (): void => Helper.mockOK(/login/, 'POST', { accessToken: faker.random.words(), name: faker.name.findName() })
export const mockInvalidData = (): void => Helper.mockOK(/login/, 'POST', { invalid: faker.random.words() })
