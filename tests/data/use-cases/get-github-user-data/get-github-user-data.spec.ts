import faker from 'faker'
import { GitHubUserModel } from '@/domain/models'
import { GetGithubUserData } from '@/data/use-cases/get-github-user-data'
import { HttpClientSpy } from '@/tests/data/mocks'
import { HttpStatusCode } from '@/data/contracts/http'
import { GithubUserError } from '@/domain/errors'

type GithubUserDataTypes = {
    githubUserData: GetGithubUserData
    githubUser: string
    httpClientSpy: HttpClientSpy<GitHubUserModel>
}

const makeGithubUserData = (url: string = faker.internet.url()): GithubUserDataTypes => {
    const httpClientSpy = new HttpClientSpy<GitHubUserModel>()
    const githubUserData = new GetGithubUserData(url, httpClientSpy)
    const githubUser = faker.random.word()
    return {
        githubUserData,
        githubUser,
        httpClientSpy
    }
}

describe('GetGithubUserData', () => {
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
})
