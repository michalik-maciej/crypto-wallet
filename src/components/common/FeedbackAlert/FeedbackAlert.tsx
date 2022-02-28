import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export interface IFeedbackAlertProps {
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  open: boolean
}

function FeedbackAlert({ message, type, open }: IFeedbackAlertProps) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  )
}

export default FeedbackAlert
