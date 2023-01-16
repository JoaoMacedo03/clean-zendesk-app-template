import faker from 'faker'
import { ILoadSurveyList } from '../useCases'

export const mockSurveyModel = (): ILoadSurveyList.Model => ({
  id: faker.random.word(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
})

export const mockSurveyListModel = (): ILoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListSpy implements ILoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<ILoadSurveyList.Model[]> {
      this.callsCount++
      return this.surveys
  }
}
