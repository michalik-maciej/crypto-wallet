import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import {
  useLoginUserMutation,
  useCreateUserMutation
} from '../../../services/local'
import { useAppDispatch } from '../../../redux/hooks'
import { logUserIn } from '../../../redux/userSlice'
import isResponseError from '../../../services/local.helpers'
import FeedbackAlert from '../../common/FeedbackAlert/FeedbackAlert'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  newUser: yup.boolean().required()
})

export interface IUserLoginInput {
  email: string
  password: string
  newUser: boolean
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
  const [createUser] = useCreateUserMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [responseErrorMessage, setResponseErrorMessage] = useState('')

  const submitForm = async (data: IUserLoginInput) => {
    try {
      if (data.newUser) await createUser(data)
      const loginResponse = await loginUser(data).unwrap()
      dispatch(logUserIn(loginResponse.userId))
    } catch (error) {
      if (isResponseError(error)) setResponseErrorMessage(error.data)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submitForm)}
        sx={{
          marginTop: 8,
          marginBottom: 8,
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
          disabled={returnLoginUser.isSuccess}
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
          disabled={returnLoginUser.isSuccess}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event: React.KeyboardEvent) =>
            event.key === 'Enter' && handleSubmit(submitForm)
          }
        />
        <Button
          variant="contained"
          fullWidth
          disabled={returnLoginUser.isSuccess}
          type="submit"
          sx={{ fontWeight: 600, m: 2 }}
        >
          Login
        </Button>
        <FormControlLabel
          {...register('newUser')}
          control={<Checkbox />}
          label="Sign up as a new user"
        />
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
