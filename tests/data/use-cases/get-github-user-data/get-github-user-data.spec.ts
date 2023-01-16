import faker from 'faker'
import { GitHubUserModel } from '@/domain/models'
import { GetGithubUserData } from '@/data/use-cases/get-github-user-data'
import { HttpClientSpy } from '../../test'

type GithubUserDataTypes = {
    githubUserData: GetGithubUserData
    httpClientSpy: HttpClientSpy<GitHubUserModel>
}

const makeGithubUserData = (url: string): GithubUserDataTypes => {
    const httpClientSpy = new HttpClientSpy<GitHubUserModel>()
    const githubUserData = new GetGithubUserData(url, httpClientSpy)
    return {
        githubUserData,
        httpClientSpy
    }
}

describe('GetGithubUserData', () => {
    test('Should call HttpClient with correct values', async () => {
        const githubUser = faker.random.word()
        const url = faker.internet.url()

        const { githubUserData, httpClientSpy } = makeGithubUserData(url)
        await githubUserData.get(githubUser)

        expect(httpClientSpy.url).toBe(`${url}/${githubUser}`)
        expect(httpClientSpy.method).toBe('GET')
    })
})
