import React from 'react'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import Hero from '../../features/Hero/Hero'
import Header from '../../features/Header/Header'
import CoinTable from '../../features/MainTable/MainTable'

function Homepage() {
  const StyledContainer = styled(TableContainer)({
    height: '100vh',
    margin: '2rem auto',
    maxWidth: '900px'
  })

  return (
    <>
      <Hero />
      <StyledContainer>
        <Header />
        <CoinTable />
      </StyledContainer>
    </>
  )
}

export default Homepage
