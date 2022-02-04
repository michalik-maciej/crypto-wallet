import React from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import bgImg from '../../../assets/hero-bg.jpg'

const StyledGrid = styled(Grid)`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-image: url(${bgImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

function Hero() {
  return <StyledGrid container />
}

export default Hero
