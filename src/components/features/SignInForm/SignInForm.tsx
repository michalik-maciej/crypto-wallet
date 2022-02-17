import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { usePostUserMutation } from '../../../services/local'

export default function SignInForm() {
  const { register, handleSubmit } = useForm()
  const [loginUser, returnLoginUser] = usePostUserMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((data) => loginUser(data))}
        sx={{
          marginTop: 8,
          paddingLeft: 2,
          paddingRight: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5">Sign In</Typography>{' '}
        <TextField
          {...register('email')}
          margin="normal"
          fullWidth
          required
          label="Email address"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          {...register('password')}
          margin="normal"
          fullWidth
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ fontWeight: 600, mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  )
}
