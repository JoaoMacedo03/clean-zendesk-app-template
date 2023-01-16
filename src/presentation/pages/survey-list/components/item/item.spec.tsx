import React from 'react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import { mockSurveyModel } from '@/domain/mocks'
import { IconName } from '@/presentation/components'

const makeSut = (survey = mockSurveyModel()): void => {
    render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
    test('Should render with correct value', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: true,
            date: new Date('2022-01-10T00:00:00')
        })
        makeSut(survey)
        expect(screen.queryByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
        expect(screen.queryByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.queryByTestId('day')).toHaveTextContent('10')
        expect(screen.queryByTestId('month')).toHaveTextContent('jan')
        expect(screen.queryByTestId('year')).toHaveTextContent('2022')
    })

    test('Should render with correct value', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: false,
            date: new Date('2023-05-03T00:00:00')
        })
        makeSut(survey)
        expect(screen.queryByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
        expect(screen.queryByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.queryByTestId('day')).toHaveTextContent('03')
        expect(screen.queryByTestId('month')).toHaveTextContent('mai')
        expect(screen.queryByTestId('year')).toHaveTextContent('2023')
    })
})
