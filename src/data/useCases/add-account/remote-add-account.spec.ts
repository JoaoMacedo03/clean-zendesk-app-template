import faker from 'faker'
import { HttpClientSpy } from '@/data/mocks'
import { RemoteAddAccount } from './remote-add-account'
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/mocks'
import { HttpStatusCode } from '@/data/contracts/http'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
    sut: RemoteAddAccount
    httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
  }

  const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
    const sut = new RemoteAddAccount(url, httpClientSpy)

    return {
      sut,
      httpClientSpy
    }
  }

describe('RemoteAddAccount', () => {
    test('Should call Http client with correct URL and Method', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        await sut.add(mockAddAccountParams())
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('POST')
    })

    test('Should call Http client with correct Body Test', async () => {
        const { sut, httpClientSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(httpClientSpy.body).toEqual(addAccountParams)
    })

    test('Should throw EmailInUserError if HttpClient return 403', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new EmailInUseError())
    })

    test('Should throw UnexpectedError if HttpClient return 400', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpClient return 500', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.serverError
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpClient return 404', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.notFound
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return an AddAccount.Model if HttpClient returns 200', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpResult = mockAddAccountModel()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.success,
          body: httpResult
        }
        const account = await sut.add(mockAddAccountParams())
        expect(account).toEqual(httpResult)
    })
})
