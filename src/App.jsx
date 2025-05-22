import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import CreateFrame from './pages/CreateFrame'

const App = () => {
  return (
    <div className='flex flex-col h-auto  poppins-regular bg-gray-200'>
      <Header />
      <Routes>
        <Route path='/createFrame' element={<CreateFrame />} />
      </Routes>
    </div>
  )
}

export default App