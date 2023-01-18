import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainComponent } from '@/main/adapters'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' caseSensitive element={<MainComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
