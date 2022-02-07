import React from 'react'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import Hero from '../../features/Hero/Hero'

import CoinTable from '../../features/CoinTable/CoinTable'

function Homepage() {
  const StyledContainer = styled(TableContainer)({
    height: '100vh',
    margin: '2rem auto',
    maxWidth: '1080px'
  })

  return (
    <>
      <Hero />
      <StyledContainer>
        <CoinTable />
      </StyledContainer>
    </>
  )
}

export default Homepage
