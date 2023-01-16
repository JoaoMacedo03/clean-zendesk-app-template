import faker from 'faker'
import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/mocks'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpStatusCode } from '@/data/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>()
    const sut = new RemoteLoadSurveyList(url, httpClientSpy)
    return {
        sut,
        httpClientSpy
    }
}

describe('RemoteLoadSurveyList', () => {
    test('Should call HttpClient with correct URL and method', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        await sut.loadAll()
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('GET')
    })

    test('Should throw AccessDeniedError if HttGetClient return 403', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should throw UnexpectedError if HttGetClient return 404', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.notFound
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttGetClient return 500', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.serverError
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return a list of SurveyModel if HttGetClient returns 200', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpResult = mockRemoteSurveyListModel()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.success,
          body: httpResult
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual([
          {
            id: httpResult[0].id,
            question: httpResult[0].question,
            didAnswer: httpResult[0].didAnswer,
            date: new Date(httpResult[0].date)
          },
          {
            id: httpResult[1].id,
            question: httpResult[1].question,
            didAnswer: httpResult[1].didAnswer,
            date: new Date(httpResult[1].date)
          },
          {
            id: httpResult[2].id,
            question: httpResult[2].question,
            didAnswer: httpResult[2].didAnswer,
            date: new Date(httpResult[2].date)
          }
        ])
    })

    test('Should return an empty list if HttGetClient returns 204', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.noContent
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual([])
    })
})
