import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import CoinPage from './components/views/CoinPage/CoinPage'
import MainTable from './components/features/MainTable/MainTable'
import MainLayout from './components/layout/MainLayout/MainLayout'
import Portfolio from './components/views/Portfolio/Portfolio'
import LoginPage from './components/views/LoginPage/LoginPage'

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<MainTable />} />
            <Route path="/coins/:coinId" element={<CoinPage />} />
            <Route path="/user/" element={<Portfolio />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

export default App
