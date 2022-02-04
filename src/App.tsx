import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
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
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

export default App
