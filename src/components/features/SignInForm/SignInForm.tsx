import { useState } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../redux/hooks'

export default function SignInForm() {
  const { register, handleSubmit } = useForm()
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
      onSubmit={handleSubmit((data) => console.log(data))}
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
