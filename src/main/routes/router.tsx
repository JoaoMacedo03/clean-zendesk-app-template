import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeLogin, MakeSignUp, MakeSurveyList } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' caseSensitive element={<MakeLogin />} />
          <Route path='/signup' caseSensitive element={<MakeSignUp />} />
          <Route caseSensitive path='/' element={<PrivateRoute />}>
            <Route path='/' caseSensitive element={<MakeSurveyList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
