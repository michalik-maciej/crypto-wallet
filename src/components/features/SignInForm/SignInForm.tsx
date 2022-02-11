import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../../../redux/hooks'
import { requestLogin } from '../../../redux/user/requestLogin'
import { UserCredentials } from '../../../redux/user/types'

export default function SignInForm() {
  const { register, handleSubmit } = useForm<UserCredentials>()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const StyledButton = styled(Button)({
    justifyContent: 'space-around',
    fontWeight: 'bold'
  })

  return (
    <Stack
      direction="row"
      component="form"
      onSubmit={handleSubmit((data) => dispatch(requestLogin(data)))}
      spacing={1}
    >
      <TextField
        {...register('email')}
        label="Email address"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        {...register('password')}
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <StyledButton variant="contained" type="submit">
        Login
      </StyledButton>
    </Stack>
  )
}
