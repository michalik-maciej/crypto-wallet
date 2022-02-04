import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

function Header() {
  const StyledTopbar = styled('div')({
    position: 'fixed',
    display: 'flex',
    padding: '1rem'
  })

  const StyledButton = styled(Button)({
    background: 'transparent',
    justifyContent: 'space-around',
    fontWeight: 'bold'
  })

  return (
    <StyledTopbar>
      <StyledButton>Login</StyledButton>
      <StyledButton>Logout</StyledButton>
    </StyledTopbar>
  )
}

export default Header
