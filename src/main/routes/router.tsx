import { Sidebar } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sidebar' caseSensitive element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
