import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

function Header() {
  const StyledTopbar = styled('button')({
    height: '4rem',
    position: 'fixed'
  })

  return (
    <StyledTopbar>
      <Button>Login</Button>
    </StyledTopbar>
  )
}

export default Header
