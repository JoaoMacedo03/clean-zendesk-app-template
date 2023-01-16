import faker from 'faker'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/mocks'
import { mockAccountModel } from '@/domain/mocks'
import { HttpRequest } from '@/data/contracts/http'
import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator'

type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    getStorageSpy: GetStorageSpy
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpClientSpy = new HttpClientSpy()
    const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)
    return { getStorageSpy, sut, httpClientSpy }
}

describe('AuthorizeHttpClientDecorator', () => {
    test('Should call GetStorage with correct value', () => {
        const { getStorageSpy, sut } = makeSut()
        sut.request(mockHttpRequest())
        expect(getStorageSpy.key).toBe('account')
    })

    test('Should not add headers if GetStorage is invalid', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpRequest: HttpRequest = {
            url: faker.internet.url(),
            method: 'GET',
            headers: {
                field: faker.random.words()
            }
        }
        await sut.request(httpRequest)
        expect(httpClientSpy.url).toBe(httpRequest.url)
        expect(httpClientSpy.headers).toEqual(httpRequest.headers)
    })

    test('Should add headers to HttpGetClient', async () => {
        const { sut, httpClientSpy, getStorageSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()

        const httpRequest: HttpRequest = {
            url: faker.internet.url(),
            method: 'GET'
        }

        await sut.request(httpRequest)
        expect(httpClientSpy.url).toBe(httpRequest.url)
        expect(httpClientSpy.headers).toEqual({ 'x-access-token': getStorageSpy.value.accessToken })
    })

    test('Should add merge headers to HttpGetClient', async () => {
        const { sut, httpClientSpy, getStorageSpy } = makeSut()
        const field = faker.random.words()
        getStorageSpy.value = mockAccountModel()

        const httpRequest: HttpRequest = {
            url: faker.internet.url(),
            method: 'GET',
            headers: {
                field
            }
        }

        await sut.request(httpRequest)
        expect(httpClientSpy.url).toBe(httpRequest.url)
        expect(httpClientSpy.headers).toEqual({
            field,
            'x-access-token': getStorageSpy.value.accessToken
        })
    })

    test('Should return the same result as HttpGetClient', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpResponse = await sut.request(mockHttpRequest())
        expect(httpResponse).toEqual(httpClientSpy.response)
    })
})
