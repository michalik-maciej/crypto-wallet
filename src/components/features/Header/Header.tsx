import React from 'react'
import { styled } from '@mui/material/styles'
import SignInForm from '../SignInForm/SignInForm'

export default function Header() {
  const StyledTopbar = styled('div')({
    // position: 'fixed',
    display: 'flex',
    padding: '1rem'
  })

  return (
    <StyledTopbar>
      <SignInForm />
    </StyledTopbar>
  )
}
