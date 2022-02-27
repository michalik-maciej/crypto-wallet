import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { logUserOut, getUserLogged } from '../../../redux/userSlice'
import FeedbackAlert from '../../common/FeedbackAlert/FeedbackAlert'
import { RootState } from '../../../redux/store'

export default function SignOutForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logged = useAppSelector((state: RootState) => getUserLogged(state))

  return (
    <Container maxWidth="xs">
      <Box
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
        <Typography variant="h5">Sign out?</Typography>{' '}
        <Button
          variant="contained"
          fullWidth
          type="button"
          sx={{ fontWeight: 600, m: 2 }}
          onClick={() => {
            navigate('/')
            dispatch(logUserOut())
          }}
        >
          Logout
        </Button>
        <FeedbackAlert open={!logged} message="Logged out" type="success" />
      </Box>
    </Container>
  )
}
