import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import CreateFrame from './pages/CreateFrame'
import Home from './pages/Home'
import OrderHistory from './pages/OrderHistory'

const App = () => {
  return (
    <div className='flex flex-col h-auto  poppins-regular bg-gray-200'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/createFrame' element={<CreateFrame />} />
        <Route path='/order-history' element={<OrderHistory />} />
      </Routes>
    </div>
  )
}

export default App