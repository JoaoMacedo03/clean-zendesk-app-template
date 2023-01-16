import faker from 'faker'
import { GitHubUserModel } from '@/domain/models'

export const mockGithubUser = (): GitHubUserModel => ({
    avatar_url: faker.internet.url(),
    bio: faker.random.words(),
    followers: faker.datatype.number(),
    following: faker.datatype.number(),
    location: faker.random.words(),
    name: faker.name.findName(),
    repos_url: faker.internet.url()
})
