import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeSidebar } from '@/main/factories/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sidebar' caseSensitive element={<MakeSidebar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
