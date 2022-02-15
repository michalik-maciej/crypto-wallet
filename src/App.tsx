import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import CoinPage from './components/views/CoinPage/CoinPage'
import Homepage from './components/views/Homepage/Homepage'
import MainLayout from './components/layout/MainLayout/MainLayout'

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:coinId" element={<CoinPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

export default App
