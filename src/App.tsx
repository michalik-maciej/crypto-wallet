import './App.css'
import React from 'react'
import { useGetPingQuery } from './services/coingecko'

function App() {
  useGetPingQuery(null)
  return <div className="App" />
}

export default App
