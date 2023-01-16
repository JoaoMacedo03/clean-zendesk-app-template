import faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/useCases'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.word(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
])
