import { ReactNode } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'

interface MyModalProps {
  open: boolean
  handleClose: () => void
  children: ReactNode
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 'xs',
  p: 1
}

export default function MyModal({ open, handleClose, children }: MyModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1000
      }}
    >
      <Fade in={open}>
        <Box sx={boxStyle}>{children}</Box>
      </Fade>
    </Modal>
  )
}
