import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface IFeebackAlertProps {
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  open: boolean
}

function FeedbackAlert({ message, type, open }: IFeebackAlertProps) {
  return (
    <Snackbar open={open}>
      <Alert sx={{ width: '100%' }} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default FeedbackAlert
