import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import CoinPage from './components/views/CoinPage/CoinPage'
import HomePage from './components/views/HomePage/HomePage'
import MainLayout from './components/layout/MainLayout/MainLayout'
import UserPage from './components/views/UserPage/UserPage'

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:coinId" element={<CoinPage />} />
            <Route path="/user/" element={<UserPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

export default App
