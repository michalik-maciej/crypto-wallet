import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useGetPingQuery } from './services/coingecko'

function App() {
  useGetPingQuery(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>homepage</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
