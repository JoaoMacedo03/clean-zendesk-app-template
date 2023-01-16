import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/mocks'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()

    render(
        <ApiContext.Provider value={{
            setCurrentAccount: setCurrentAccountMock,
            getCurrentAccount: () => mockAccountModel()
        }}>
            <Router location={history.location} navigator={history}>
                <SurveyList loadSurveyList={loadSurveyListSpy} />
            </Router>
        </ApiContext.Provider>
    )
    return { loadSurveyListSpy, history, setCurrentAccountMock }
}

describe('SurveyList Component', () => {
    test('Should present 4 empty items on start', async () => {
        makeSut()
        const surveyList = screen.queryByTestId('survey-list')
        await waitFor(() => {
            expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
            expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        })
    })

    test('Should call LoadSurveyList', async () => {
        const { loadSurveyListSpy } = makeSut()
        await waitFor(() => {
            expect(loadSurveyListSpy.callsCount).toBe(1)
        })
    })

    test('Should render SurveyItem on success', async () => {
        makeSut()
        const surveyList = screen.queryByTestId('survey-list')
        await waitFor(() => {
            expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3)
            expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        })
    })

    test('Should render UnexpectedError on failure', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        const error = new UnexpectedError()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
        makeSut(loadSurveyListSpy)
        await waitFor(() => {
            expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
            expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
        })
    })

    test('Should logout on AccessDeniedError', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
        const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)
        await waitFor(() => {
            expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
            expect(history.location.pathname).toBe('/login')
        })
    })

    test('Should call LoadSurveyList on reload', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
        makeSut(loadSurveyListSpy)

        await waitFor(() => {
            fireEvent.click(screen.getByTestId('reload'))
        })

        await waitFor(() => {
            expect(loadSurveyListSpy.callsCount).toBe(1)
        })
    })
})
