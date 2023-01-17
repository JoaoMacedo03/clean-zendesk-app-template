import faker from 'faker'
import { GitHubUserModel } from '@/domain/models'
import { GetGithubUser } from '@/data/use-cases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { HttpStatusCode } from '@/data/contracts/http'
import { GithubUserError } from '@/domain/errors'
import { mockGithubUser } from '@/tests/domain/mocks'

type GithubUserDataTypes = {
    githubUserData: GetGithubUser
    githubUser: string
    httpClientSpy: HttpClientSpy<GitHubUserModel>
}

const makeGithubUserData = (url: string = faker.internet.url()): GithubUserDataTypes => {
    const httpClientSpy = new HttpClientSpy<GitHubUserModel>()
    const githubUserData = new GetGithubUser(url, httpClientSpy)
    const githubUser = faker.random.word()
    return {
        githubUserData,
        githubUser,
        httpClientSpy
    }
}

describe('GetGithubUser', () => {
    test('Should call HttpClient with correct values', async () => {
        const url = faker.internet.url()
        const { githubUserData, httpClientSpy, githubUser } = makeGithubUserData(url)
        await githubUserData.get(githubUser)
        expect(httpClientSpy.url).toBe(`${url}/${githubUser}`)
        expect(httpClientSpy.method).toBe('GET')
    })

    test('Should throw GithubUserError on HttpClient failure', async () => {
        const { githubUserData, httpClientSpy, githubUser } = makeGithubUserData()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }
        const promise = githubUserData.get(githubUser)
        await expect(promise).rejects.toThrow(new GithubUserError())
    })

    test('Should return an GithubUserModel if HttpClient succeeds', async () => {
        const { githubUserData, httpClientSpy, githubUser } = makeGithubUserData()
        const httpResponse = mockGithubUser()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.success,
            body: httpResponse
        }
        const githubUserResult = await githubUserData.get(githubUser)
        expect(githubUserResult).toEqual(httpResponse)
    })
})
