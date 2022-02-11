import React from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import bgImg from '../../../assets/hero-bg.jpg'

const StyledGrid = styled(Grid)({
  position: 'relative',
  height: '20vh',
  width: '100vw',
  overflow: 'hidden',
  backgroundImage: `url(${bgImg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: -100
})

export default function Hero() {
  return <StyledGrid container />
}
