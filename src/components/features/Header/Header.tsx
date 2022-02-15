import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../redux/hooks'
import { usePostUserMutation } from '../../../services/local'
import { requestLogin } from '../../../redux/user/requestLogin'

function Header() {
  const [PostUser] = usePostUserMutation()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

export default function Header() {
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
    dispatch(requestLogin({ email, password }))
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
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="password"
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
    </StyledTopbar>
  )
}
