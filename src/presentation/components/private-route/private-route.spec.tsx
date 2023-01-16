import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { render, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/mocks'

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
        <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
            <Router location={history.location} navigator={history}>
                <Routes>
                    <Route caseSensitive path='/' element={<PrivateRoute />}>
                        <Route path='/' caseSensitive element={<SurveyList loadSurveyList={loadSurveyListSpy} />} />
                    </Route>
                </Routes>
            </Router>
        </ApiContext.Provider>
    )
    return { history }
}

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty', async () => {
        const { history } = makeSut(null)
        await waitFor(() => {
            expect(history.location.pathname).toBe('/login')
        })
    })

    test('Should render current component if token is not empty', async () => {
        const { history } = makeSut()
        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
        })
    })
})
