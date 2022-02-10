import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { usePostUserMutation } from '../../../services/local'
import { logUser } from '../../../redux/userSlice'

function Header() {
  const [PostUser] = usePostUserMutation()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const StyledTopbar = styled('div')({
    // position: 'fixed',
    display: 'flex',
    padding: '1rem'
  })

  const StyledButton = styled(Button)({
    // background: 'transparent',
    justifyContent: 'space-around',
    fontWeight: 'bold'
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // PostUser({ email: 'test@email', password: '123' })
    logUser()
  }

  return (
    <StyledTopbar>
      <Stack
        direction="row"
        component="form"
        onSubmit={handleSubmit}
        spacing={1}
      >
        <TextField
          name="email"
          label="Email address"
          // autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          // autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Login
        </StyledButton>
      </Stack>
    </StyledTopbar>
  )
}

export default Header
