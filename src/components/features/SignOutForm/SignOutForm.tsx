import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { logUserOut, getUserLogged } from '../../../redux/userSlice'
import FeedbackAlert from '../../common/FeedbackAlert/FeedbackAlert'
import { RootState } from '../../../redux/store'

interface ISignOutFormProps {
  handleSuccess: () => void
}

export default function SignOutForm({ handleSuccess }: ISignOutFormProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logged = useAppSelector((state: RootState) => getUserLogged(state))
  const [feedbackData, setFeedbackData] = useState({ open: false })

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedbackData({ open: false })
      if (!logged) handleSuccess()
    }, 2000)
    return () => clearTimeout(timer)
  }, [logged])

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
            setFeedbackData({ open: true })
          }}
        >
          Logout
        </Button>
        <FeedbackAlert
          open={feedbackData.open}
          message="Logged out"
          type="success"
        />
      </Box>
    </Container>
  )
}
