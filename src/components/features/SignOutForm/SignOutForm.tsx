import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAppDispatch } from '../../../redux/hooks'
import { logUserOut } from '../../../redux/userSlice'

export default function SignOutForm() {
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          paddingLeft: 2,
          paddingRight: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5">Sign out</Typography>{' '}
        <Button
          variant="contained"
          fullWidth
          type="button"
          sx={{ fontWeight: 600, m: 2 }}
          onClick={() => dispatch(logUserOut())}
        >
          Logout
        </Button>
      </Box>
    </Container>
  )
}
