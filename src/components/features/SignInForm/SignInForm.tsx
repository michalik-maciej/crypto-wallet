import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLoginUserMutation } from '../../../services/local'
import { useAppDispatch } from '../../../redux/hooks'
import { logUserIn } from '../../../redux/userSlice'
import isResponseError from '../../../services/local.helpers'
import FeedbackAlert from '../../common/FeedbackAlert/FeedbackAlert'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export interface IUserLoginInput {
  email: string
  password: string
}

export default function SignInForm() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserLoginInput>({
    resolver: yupResolver(validationSchema)
  })
  const [loginUser, returnLoginUser] = useLoginUserMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [responseErrorMessage, setResponseErrorMessage] = useState('')

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(async (data) => {
          try {
            const loginResponse = await loginUser(data).unwrap()
            dispatch(logUserIn(loginResponse.userId))
          } catch (error) {
            if (isResponseError(error)) setResponseErrorMessage(error.data)
            console.log(error)
          }
        })}
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
          error={!!errors.email}
          helperText={errors.email ? errors.email?.message : ''}
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
          error={!!errors.password}
          helperText={errors.password ? errors.password?.message : ''}
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
          sx={{ fontWeight: 600, m: 2 }}
        >
          Login
        </Button>
        {returnLoginUser.isError && (
          <FeedbackAlert
            open={returnLoginUser.isError}
            message={responseErrorMessage}
            type="error"
          />
        )}
        {returnLoginUser.isSuccess && (
          <FeedbackAlert
            open={returnLoginUser.isSuccess}
            message={returnLoginUser.data.message}
            type="success"
          />
        )}
      </Box>
    </Container>
  )
}
